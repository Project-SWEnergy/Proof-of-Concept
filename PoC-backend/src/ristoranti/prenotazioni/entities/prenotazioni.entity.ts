import { ApiProperty } from '@nestjs/swagger';
import { StatoPrenotazione } from '../dto/stato-prenotazione.dto';

export class Prenotazione {
	@ApiProperty()
	id: number;
	@ApiProperty()
	username: string;
	@ApiProperty()
	restaurantId: number;
	@ApiProperty()
	restaurantName: string;
	@ApiProperty()
	date: Date;
	@ApiProperty()
	seats: number;
	@ApiProperty()
	status: StatoPrenotazione;
	@ApiProperty()
	kids: number;
	@ApiProperty()
	disabili: boolean;
}