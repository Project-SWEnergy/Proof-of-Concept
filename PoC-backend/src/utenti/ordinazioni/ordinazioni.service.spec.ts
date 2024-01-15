import { Test, TestingModule } from '@nestjs/testing';
import { OrdinazioniService } from './ordinazioni.service';

describe('OrdinazioniService', () => {
  let service: OrdinazioniService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdinazioniService],
    }).compile();

    service = module.get<OrdinazioniService>(OrdinazioniService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
