import { Test, TestingModule } from '@nestjs/testing';
import { UtentiService } from './utenti.service';

describe('UtentiService', () => {
  let service: UtentiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtentiService],
    }).compile();

    service = module.get<UtentiService>(UtentiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
