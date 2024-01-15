import { Ristorante } from './ristoranti.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ResultRistorante {
	@ApiProperty()
	result: boolean;
	@ApiProperty()
	message: string;
	@ApiProperty()
	restaurant?: Ristorante;
}

