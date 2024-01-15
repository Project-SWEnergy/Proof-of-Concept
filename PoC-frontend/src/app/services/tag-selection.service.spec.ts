import { TestBed } from '@angular/core/testing';

import { TagSelectionService } from './tag-selection.service';

describe('TagSelectionService', () => {
  let service: TagSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
