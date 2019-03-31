import { TestBed, inject } from '@angular/core/testing';

import { ConfirmOnExitService } from "./confirm-on-exit-service";

describe('ConfirmOnExitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmOnExitService]
    });
  });

  it('should be created', inject([ConfirmOnExitService], (service: ConfirmOnExitService) => {
    expect(service).toBeTruthy();
  }));
});
