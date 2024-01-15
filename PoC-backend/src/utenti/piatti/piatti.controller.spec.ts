import { Test, TestingModule } from '@nestjs/testing';
import { PiattiController } from './piatti.controller';
import { PiattiService } from './piatti.service';

describe('PiattiController', () => {
  let controller: PiattiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PiattiController],
      providers: [PiattiService],
    }).compile();

    controller = module.get<PiattiController>(PiattiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
