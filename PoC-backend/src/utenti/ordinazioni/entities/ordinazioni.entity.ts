import { ApiProperty } from '@nestjs/swagger';
import { PiattoOrdinato } from './piatto-ordinato.entity';

export class Ordinazione {
	@ApiProperty()
	user_id: number;
	@ApiProperty()
	username: string;
	@ApiProperty()
	reservation: number;
	@ApiProperty()
	dishes: PiattoOrdinato[];
}
