import { TestBed } from '@angular/core/testing';

import { StationListService } from './station-list.service';

describe('StationListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StationListService = TestBed.get(StationListService);
    expect(service).toBeTruthy();
  });
});
