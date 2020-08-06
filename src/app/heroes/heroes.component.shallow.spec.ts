import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HeroesComponent } from './heroes.component';

//  We wouldn't have to manually mock if we just use ng-mocks https://www.npmjs.com/package/ng-mocks
@Component({
  selector: 'app-hero',
  template: '<div></div>',
})
class MockHeroeComponent {
  @Input() hero: Hero;
  //  @Output() delete: new EventEmitter();
}

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
      declarations: [HeroesComponent, MockHeroeComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set heros correctly from injected hero service', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges(); //  fire lifecycle events

    expect(fixture.componentInstance.heroes.length).toEqual(3);
  });

  it('should create one <li> for each hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges(); //  fire lifecyle events

    expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(3);
  });
});
