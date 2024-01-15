import { ApiProperty } from '@nestjs/swagger';

export class CreatePiattiDto {
	@ApiProperty()
	readonly name: string;
	@ApiProperty()
	readonly description: string;
	@ApiProperty()
	readonly price: number;
	@ApiProperty()
	readonly image: JSON;
	@ApiProperty()
	restaurantId: number;
}
