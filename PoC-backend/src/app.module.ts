import { Module } from '@nestjs/common';
import { UtentiModule } from './utenti/utenti.module';
import { RistorantiModule } from './ristoranti/ristoranti.module';

@Module({

	imports: [UtentiModule, RistorantiModule]
})
export class AppModule { }
