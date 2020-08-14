import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';
import { HeroComponent } from '../hero/hero.component';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent (deep integration tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'WonderWoman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 },
    ];

    //  Note: We can simply use auto mocked providers with Spectator
    mockHeroService = jasmine.createSpyObj<HeroService>([
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeroesComponent, HeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each hero as a hero component', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    //  Call change detection (fire lifecycle events)
    //  Will initialize parent component and all child components
    fixture.detectChanges();

    const heroComponentDebugElements: DebugElement[] = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    const firstHeroComp: HeroComponent =
      heroComponentDebugElements[0].componentInstance;
    const secondHeroComp: HeroComponent =
      heroComponentDebugElements[1].componentInstance;
    const thirdHeroComp: HeroComponent =
      heroComponentDebugElements[2].componentInstance;

    expect(heroComponentDebugElements.length).toEqual(3);
    expect(firstHeroComp.hero.name).toEqual('SpiderDude');
    expect(secondHeroComp.hero.name).toEqual('WonderWoman');
    expect(thirdHeroComp.hero.name).toEqual('SuperDude');
  });

  describe('DOM Interactions', () => {
    describe('Triggering Events on Elements', () => {
      it(`should call heroService.deleteHero when HeroComponent's delete btn is clicked`, () => {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const heroComponentDebugElements: DebugElement[] = fixture.debugElement.queryAll(
          By.directive(HeroComponent)
        );
        const deleteButton = heroComponentDebugElements[0].query(
          By.css('button')
        );
        deleteButton.triggerEventHandler('click', {
          stopPropagation: () => {},
        });

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(
          HEROES[0]
        );
      });
    });

    describe('Emitting Events from Children', () => {
      it(`should call heroService.deleteHero when HeroComponent emits a delete event`, () => {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const heroComponentDebugElements: DebugElement[] = fixture.debugElement.queryAll(
          By.directive(HeroComponent)
        );

        (<HeroComponent>(
          heroComponentDebugElements[0].componentInstance
        )).delete.emit(undefined);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(
          HEROES[0]
        );
      });
    });

    describe('Raising Events on Child Directives', () => {
      it(`should call heroService.deleteHero when HeroComponent's delete btn is clicked`, () => {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        const heroComponentDebugElements: DebugElement[] = fixture.debugElement.queryAll(
          By.directive(HeroComponent)
        );

        heroComponentDebugElements[0].triggerEventHandler('delete', null);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(
          HEROES[0]
        );
      });
    });

    describe('Interacting with Input Boxes', () => {
      it('should add new hero to hero list when add btn is clicked', () => {
        //  Arrange
        //  ============================================================
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges(); //  Don't forget, Heroes Comp loads heroes in NgOnInit(), so you need to fire lifecycle events

        const heroName = 'Mr. Ice';
        mockHeroService.addHero.and.returnValue(
          of({ id: 5, name: heroName, strength: 4 })
        );

        const inputElement: HTMLInputElement = fixture.debugElement.query(
          By.css('input')
        ).nativeElement;

        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

        //  Act
        //  ============================================================
        inputElement.value = heroName;
        addButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        const heroText = (fixture.debugElement.query(By.css('ul'))
          .nativeElement as HTMLElement).textContent;

        //  Assert
        //  ============================================================
        expect(heroText).toContain(heroName);
      });
    });
  });
});
