import { ApiProperty } from '@nestjs/swagger';
import { PiattoOrdinato } from '../entities/piatto-ordinato.entity';

export class CreatePrenotazioniDto {
	@ApiProperty()
	readonly restaurantId: number;
	@ApiProperty()
	readonly date: Date;
	@ApiProperty()
	readonly seats: number;
	@ApiProperty()
	readonly kids: number;
	@ApiProperty()
	readonly disabili: boolean;
	@ApiProperty()
	readonly dishes: PiattoOrdinato[];
}
