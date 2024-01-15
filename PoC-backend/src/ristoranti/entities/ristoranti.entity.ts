import { Orario } from './orario.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Ristorante {
	@ApiProperty()
	readonly id: number;
	@ApiProperty()
	readonly name: string;
	@ApiProperty()
	readonly address: string;
	@ApiProperty()
	readonly city: string;
	@ApiProperty()
	readonly photo?: JSON;
	@ApiProperty()
	readonly telephone?: string;
	@ApiProperty()
	readonly website?: string;
	@ApiProperty()
	readonly cost?: number;
	@ApiProperty()
	readonly kids?: boolean;
	@ApiProperty()
	readonly disabili?: boolean;
	@ApiProperty()
	readonly tags?: string[];
	@ApiProperty()
	readonly description?: string;
	@ApiProperty()
	readonly apertura?: Orario[];
}
