import { Module } from '@nestjs/common';
import { RistorantiService } from './ristoranti.service';
import { RistorantiController } from './ristoranti.controller';
import { PrenotazioniModule } from './prenotazioni/prenotazioni.module';
import { PiattiModule } from './piatti/piatti.module';

@Module({
	controllers: [RistorantiController],
	providers: [RistorantiService],
	imports: [PrenotazioniModule, PiattiModule],
})
export class RistorantiModule { }
