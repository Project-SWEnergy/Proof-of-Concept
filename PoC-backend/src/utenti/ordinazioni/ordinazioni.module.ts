import { Module } from '@nestjs/common';
import { OrdinazioniService } from './ordinazioni.service';
import { OrdinazioniController } from './ordinazioni.controller';

@Module({
  controllers: [OrdinazioniController],
  providers: [OrdinazioniService],
})
export class OrdinazioniModule {}
