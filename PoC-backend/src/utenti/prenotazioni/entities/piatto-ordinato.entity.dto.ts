import { ApiProperty } from '@nestjs/swagger';
import { Dish } from './dish.entity';

export class PiattoOrdinatoDto {
	@ApiProperty()
	dish: Dish;
	@ApiProperty()
	quantity: number;
}
