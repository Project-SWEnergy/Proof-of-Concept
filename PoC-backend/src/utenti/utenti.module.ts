import { Module } from '@nestjs/common';
import { UtentiService } from './utenti.service';
import { UtentiController } from './utenti.controller';
import { OrdinazioniModule } from './ordinazioni/ordinazioni.module';
import { RistorantiModule } from './ristoranti/ristoranti.module';
import { PrenotazioniModule } from './prenotazioni/prenotazioni.module';
import { PiattiModule } from './piatti/piatti.module';

@Module({
	controllers: [UtentiController],
	providers: [UtentiService],
	imports: [OrdinazioniModule, RistorantiModule, PrenotazioniModule, PiattiModule],
})
export class UtentiModule { }
