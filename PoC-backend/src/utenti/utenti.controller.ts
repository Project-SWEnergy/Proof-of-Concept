import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UtentiService } from './utenti.service';
import { CreateUtentiDto, CreateUtentiResultDto } from './dto/create-utenti.dto';
import { UpdateUtentiDto, UpdateUtentiResultDto } from './dto/update-utenti.dto';
import { AuthenticationDataDto, AuthenticationResult } from './dto/authentication-data.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('utenti')
@Controller('utenti')
export class UtentiController {
	constructor(private readonly utentiService: UtentiService) { }

	@Post()
	@ApiOperation({ summary: 'Crea un nuovo utente', description: 'Ritorna il risultato della creazione dell\'utente' })
	@ApiResponse({ status: 201, type: CreateUtentiResultDto })
	async create(@Body() createUtentiDto: CreateUtentiDto): Promise<CreateUtentiResultDto> {
		return await this.utentiService.create(createUtentiDto);
	}

	@Post('login')
	@ApiOperation({ summary: 'Autentica un utente', description: 'Ritorna il risultato dell\'autenticazione ed eventualmente l\'utente' })
	@ApiResponse({ status: 201, type: AuthenticationResult })
	async authenticate(@Body() authenicationDataDto: AuthenticationDataDto): Promise<AuthenticationResult> {
		return await this.utentiService.authenticate(authenicationDataDto);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Aggiorna un utente', description: 'Ritorna il risultato dell\'aggiornamento dell\'utente' })
	@ApiResponse({ status: 200, type: UpdateUtentiResultDto })
	async update(@Param('id') id: string, @Body() updateUtentiDto: UpdateUtentiDto): Promise<CreateUtentiResultDto> {
		return await this.utentiService.update(+id, updateUtentiDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Elimina un utente', description: 'Ritorna il risultato dell\'eliminazione dell\'utente' })
	@ApiResponse({ status: 200, type: UpdateUtentiResultDto })
	async remove(@Param('id') id: string): Promise<UpdateUtentiResultDto> {
		return await this.utentiService.remove(+id);
	}
}
