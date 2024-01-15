import { ApiProperty } from '@nestjs/swagger';

export class UtenteDto {
	@ApiProperty()
	id: number;
	@ApiProperty()
	email: string;
	@ApiProperty()
	username: string;
	@ApiProperty()
	password: string;
}

export class CreateUtentiDto {
	@ApiProperty()
	readonly email: string;
	@ApiProperty()
	readonly username: string;
	@ApiProperty()
	readonly password: string;
}

export class CreateUtentiResultDto {
	@ApiProperty()
	result: boolean;
	@ApiProperty()
	message: string;
	@ApiProperty()
	utente?: UtenteDto;
}
