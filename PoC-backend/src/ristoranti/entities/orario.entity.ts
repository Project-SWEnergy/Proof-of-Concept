import { ApiProperty } from "@nestjs/swagger";

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
