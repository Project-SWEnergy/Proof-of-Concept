import { Test, TestingModule } from '@nestjs/testing';
import { OrdinazioniController } from './ordinazioni.controller';
import { OrdinazioniService } from './ordinazioni.service';

describe('OrdinazioniController', () => {
  let controller: OrdinazioniController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdinazioniController],
      providers: [OrdinazioniService],
    }).compile();

    controller = module.get<OrdinazioniController>(OrdinazioniController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
