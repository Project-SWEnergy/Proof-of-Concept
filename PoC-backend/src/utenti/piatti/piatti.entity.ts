import { ApiProperty } from '@nestjs/swagger';

export class Piatti {
	@ApiProperty()
	id: number;
	@ApiProperty()
	name: string;
	@ApiProperty()
	description: string;
	@ApiProperty()
	price: number;
	@ApiProperty()
	image: JSON;
	@ApiProperty()
	restaurantId: number;
	@ApiProperty()
	ingredients: string[];
}

