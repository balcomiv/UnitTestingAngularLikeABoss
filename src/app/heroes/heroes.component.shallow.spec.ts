import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent (shallow integration tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [],
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should do nothing', () => {
    expect(true).toBeTruthy();
  });
});
