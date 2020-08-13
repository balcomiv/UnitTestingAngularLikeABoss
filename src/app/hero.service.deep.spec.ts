import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';

/**
 * Why is this a deep test? Because we are testing the actual Http call
 */

describe('Hero', () => {
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let heroService: HeroService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj<MessageService>(['add']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService },
      ],
    });

    heroService = TestBed.inject(HeroService);
    httpTestingController = TestBed.inject(HttpTestingController); // Get service from DI registry
  });

  describe('getHero()', () => {
    it('should call get with the correct URL', () => {
      heroService.getHero(4).subscribe();
      // heroService.getHero(3).subscribe();    // Uncomment to see the verify catch the extra call and fail the test

      // Expect is a little differnt for http
      const request = httpTestingController.expectOne('api/heroes/4');
      request.flush({ id: 4, name: 'SuperDude', strength: 100 });
      httpTestingController.verify(); //  Verify we got only the exact call we expected. No extraneous calls.
    });
  });
});
