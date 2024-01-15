import { Test, TestingModule } from '@nestjs/testing';
import { PiattiService } from './piatti.service';

describe('PiattiService', () => {
  let service: PiattiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PiattiService],
    }).compile();

    service = module.get<PiattiService>(PiattiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
