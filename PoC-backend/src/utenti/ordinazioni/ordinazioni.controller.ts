import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { OrdinazioniService } from './ordinazioni.service';
import { CreateOrdinazioniDto } from './dto/create-ordinazioni.dto';
import { OrdinazioniResult } from './dto/result-ordinazioni.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('utenti/ordinazioni')
@Controller('/utenti/:id/ordinazioni')
export class OrdinazioniController {
	constructor(private readonly ordinazioniService: OrdinazioniService) { }

	@Post()
	@ApiOperation({ summary: 'Crea una nuova ordinazione', description: 'Controlla che esista una prenotazione collegata e che l\'utente ne faccia parte. Nel qual caso viene inserita l\'ordinazione' })
	@ApiResponse({ status: 201, type: OrdinazioniResult })
	async create(
		@Param('id') id: string,
		@Body() createOrdinazioniDto: CreateOrdinazioniDto): Promise<OrdinazioniResult> {
		return await this.ordinazioniService.create(+id, createOrdinazioniDto);
	}

	@Get(':prenotation-id')
	@ApiOperation({ summary: 'Restituisce una ordinazione', description: 'Restituisce una ordinazione se l\'utente ne fa parte' })
	@ApiResponse({ status: 200, type: OrdinazioniResult })
	async findOne(
		@Param('id') user_id: string,
		@Param('prenotation-id') prenotation_id: string): Promise<OrdinazioniResult> {
		return await this.ordinazioniService.findOne(+user_id, +prenotation_id);
	}

	@Patch()
	@ApiOperation({ summary: 'Aggiorna una ordinazione', description: 'Aggiorna una ordinazione se l\'utente ne fa parte' })
	@ApiResponse({ status: 200, type: OrdinazioniResult })
	async update(
		@Param('id') user_id: string,
		@Body() updateOrdinazioniDto: CreateOrdinazioniDto): Promise<OrdinazioniResult> {
		return this.ordinazioniService.update(+user_id, updateOrdinazioniDto);
	}
}
