import { Module } from '@nestjs/common';
import { PrenotazioniService } from './prenotazioni.service';
import { PrenotazioniController } from './prenotazioni.controller';

@Module({
  controllers: [PrenotazioniController],
  providers: [PrenotazioniService],
})
export class PrenotazioniModule {}
