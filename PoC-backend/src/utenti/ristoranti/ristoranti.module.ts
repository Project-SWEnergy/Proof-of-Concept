import { Module } from '@nestjs/common';
import { RistorantiService } from './ristoranti.service';
import { RistorantiController } from './ristoranti.controller';

@Module({
  controllers: [RistorantiController],
  providers: [RistorantiService],
})
export class RistorantiModule {}
