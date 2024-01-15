import { ApiProperty } from '@nestjs/swagger';
import { Prenotazione } from './prenotazioni.entity';

export class ResultPrenotazione {
	@ApiProperty()
	result: boolean;
	@ApiProperty()
	message: string;
	@ApiProperty()
	prenotazione?: Prenotazione;
}
