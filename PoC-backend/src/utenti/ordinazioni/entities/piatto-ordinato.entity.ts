import { ApiProperty } from '@nestjs/swagger';
import { Dish } from './dish.entity';

export class PiattoOrdinato {
	@ApiProperty()
	dish: Dish;
	@ApiProperty()
	quantity: number;
}
