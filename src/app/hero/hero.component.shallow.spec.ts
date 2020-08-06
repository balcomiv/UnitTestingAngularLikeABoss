import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeroComponent } from './hero.component';

describe('HeroComponent (shallow integration tests', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
    });
    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the correct hero', () => {
    fixture.componentInstance.hero = {
      id: 1,
      name: 'SuperDude',
      strength: 33,
    };

    expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
  });

  it('should render hero name in anchor tag', () => {
    fixture.componentInstance.hero = {
      id: 1,
      name: 'SuperDude',
      strength: 33,
    };

    fixture.detectChanges();

    //  Native
    expect(fixture.nativeElement.querySelector('a').textContent).toContain(
      'SuperDude'
    );

    //  Debug Element
    expect(
      fixture.debugElement.query(By.css('a')).nativeElement.textContent
    ).toContain('SuperDude');
  });
});
