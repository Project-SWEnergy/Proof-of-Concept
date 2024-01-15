import { PartialType } from '@nestjs/mapped-types';
import { CreateUtentiDto, UtenteDto } from './create-utenti.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUtentiDto extends PartialType(CreateUtentiDto) {
	@ApiProperty()
	readonly email: string;
	@ApiProperty()
	readonly username: string;
	@ApiProperty()
	readonly password: string;
}

export class UpdateUtentiResultDto {
	@ApiProperty()
	result: boolean;
	@ApiProperty()
	message: string;
	@ApiProperty()
	utente?: UtenteDto;
}
