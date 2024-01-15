import { ApiProperty } from '@nestjs/swagger';

export enum Giorno {
	Lunedi = "lunedi",
	Martedi = "martedi",
	Mercoledi = "mercoledi",
	Giovedi = "giovedi",
	Venerdi = "venerdi",
	Sabato = "sabato",
	Domenica = "domenica",
}

export class Orario {
	@ApiProperty()
	readonly day: Giorno;
	@ApiProperty()
	readonly begin: Date;
	@ApiProperty()
	readonly end: Date;
}

export class CreateRistorantiDto {
	@ApiProperty()
	readonly email: string;
	@ApiProperty()
	readonly password: string;
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
