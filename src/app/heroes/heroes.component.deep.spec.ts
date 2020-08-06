import { ComponentFixture, TestBed } from '@angular/core/testing';
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
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    //  Call change detection (fire lifecycle events)
    //  Will initialize parent component and all child components
    fixture.detectChanges();
  });

  it('should behave...', () => {
    expect(true).toEqual(true);
  });
});
