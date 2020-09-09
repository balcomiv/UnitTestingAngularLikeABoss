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

  /**
   * Unit testing HTTP Client
   */
  describe('getHero()', () => {
    it('should call get with the correct URL', () => {
      heroService.getHero(4).subscribe();

      // heroService.getHero(3).subscribe();    // Uncomment to see the expectOne catch the extra call and fail the test

      // Assertion is a little differnt for http
      const req = httpTestingController.expectOne('api/heroes/4');

      //  Set the fake data to be returned by the mock
      req.flush({ id: 4, name: 'SuperDude', strength: 100 });

      //  Verify we got only the exact call we expected. No extraneous calls.
      httpTestingController.verify();

      //  Assert anything else we need to for the request
      expect(req.request.method).toEqual('GET');
    });
  });
});
