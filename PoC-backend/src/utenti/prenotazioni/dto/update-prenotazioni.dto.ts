import { PartialType } from '@nestjs/mapped-types';
import { CreatePrenotazioniDto } from './create-prenotazioni.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PiattoOrdinato } from '../entities/piatto-ordinato.entity';

export class UpdatePrenotazioniDto extends PartialType(CreatePrenotazioniDto) {
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
