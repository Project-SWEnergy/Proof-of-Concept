import { Test, TestingModule } from '@nestjs/testing';
import { RistorantiController } from './ristoranti.controller';
import { RistorantiService } from './ristoranti.service';

describe('RistorantiController', () => {
  let controller: RistorantiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RistorantiController],
      providers: [RistorantiService],
    }).compile();

    controller = module.get<RistorantiController>(RistorantiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
