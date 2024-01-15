import { ApiProperty } from '@nestjs/swagger';
import { PiattoOrdinato } from '../entities/piatto-ordinato.entity';

export class CreateOrdinazioniDto {
	@ApiProperty()
	readonly id_prenotazione: number;
	@ApiProperty()
	readonly dishes: PiattoOrdinato[];
}
