import { Module } from '@nestjs/common';
import { PiattiService } from './piatti.service';
import { PiattiController } from './piatti.controller';

@Module({
  controllers: [PiattiController],
  providers: [PiattiService],
})
export class PiattiModule {}
