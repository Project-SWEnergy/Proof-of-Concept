import { ApiProperty } from '@nestjs/swagger';

export class Dish {
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
	//	@ApiProperty()
	//  ingredients: string[];
}
