import { TestBed, inject } from '@angular/core/testing';

import { CustomMessageService } from './custom-message.service';

describe('CustomMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomMessageService]
    });
  });

  it('should be created', inject([CustomMessageService], (service: CustomMessageService) => {
    expect(service).toBeTruthy();
  }));
});
