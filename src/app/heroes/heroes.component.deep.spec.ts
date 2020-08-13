import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';
import { HeroComponent } from '../hero/hero.component';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent (shallow integration tests)', () => {
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

    const firstHero: HeroComponent =
      heroComponentDebugElements[0].componentInstance;
    const secondHero: HeroComponent =
      heroComponentDebugElements[1].componentInstance;
    const thirdHero: HeroComponent =
      heroComponentDebugElements[2].componentInstance;

    expect(heroComponentDebugElements.length).toEqual(3);
    expect(firstHero.hero.name).toEqual('SpiderDude');
    expect(secondHero.hero.name).toEqual('WonderWoman');
    expect(thirdHero.hero.name).toEqual('SuperDude');
  });
});