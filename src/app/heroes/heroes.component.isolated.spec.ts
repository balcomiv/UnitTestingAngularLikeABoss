import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent (isolated tests)', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'WonderWoman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 },
    ];

    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHeroe',
      'deleteHero',
    ]);

    component = new HeroesComponent(mockHeroService);
  });

  /**
   * This is a STATE TEST
   */
  it('should remove indicated hero from heroes list', () => {
    mockHeroService.deleteHero.and.returnValue(of(true));
    component.heroes = HEROES;

    component.delete(HEROES[2]);

    expect(component.heroes.length).toEqual(2);
  });

  /**
   * This is an INTERACTION TEST
   */
  it('should call deleteHero with correct value', () => {
    mockHeroService.deleteHero.and.returnValue(of(true));
    component.heroes = HEROES;

    component.delete(HEROES[2]);

    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
  });
});
