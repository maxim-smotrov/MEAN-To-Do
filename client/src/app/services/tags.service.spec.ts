import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TagsService } from './tags.service';

describe('TagsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TagsService]
    });
  });

  it('should be created', inject([TagsService], (service: TagsService) => {
    expect(service).toBeTruthy();
  }));
});
