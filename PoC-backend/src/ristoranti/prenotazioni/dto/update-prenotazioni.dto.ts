import { StatoPrenotazione } from './stato-prenotazione.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePrenotazioniDto {
	@ApiProperty()
	readonly reservationId: number;
	@ApiProperty()
	readonly date: Date;
	@ApiProperty()
	readonly seats: number;
	@ApiProperty()
	readonly status: StatoPrenotazione;
	@ApiProperty()
	readonly kids: number;
	@ApiProperty()
	readonly disabili: boolean;
}

