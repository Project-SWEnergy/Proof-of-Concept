import { Test, TestingModule } from '@nestjs/testing';
import { RistorantiService } from './ristoranti.service';

describe('RistorantiService', () => {
  let service: RistorantiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RistorantiService],
    }).compile();

    service = module.get<RistorantiService>(RistorantiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
