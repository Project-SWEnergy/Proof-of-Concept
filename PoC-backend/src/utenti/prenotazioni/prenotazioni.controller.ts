import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrenotazioniService } from './prenotazioni.service';
import { CreatePrenotazioniDto } from './dto/create-prenotazioni.dto';
import { UpdatePrenotazioniDto } from './dto/update-prenotazioni.dto';
import { ResultPrenotazione } from './entities/result-prenotazione';

@ApiTags('utenti/prenotazioni')
@Controller('prenotazioni')
export class PrenotazioniController {
	constructor(private readonly prenotazioniService: PrenotazioniService) { }

	@Post()
	@ApiOperation({ summary: 'Crea una prenotazione' })
	@ApiResponse({ status: 200, type: ResultPrenotazione })
	async create(@Body() createPrenotazioniDto: CreatePrenotazioniDto): Promise<ResultPrenotazione> {
		return await this.prenotazioniService.create(createPrenotazioniDto);
	}

	@Get()
	@ApiOperation({ summary: 'Lista prenotazioni', description: 'Recupera la lista delle prenotazioni' })
	@ApiResponse({ status: 200, type: [ResultPrenotazione] })
	async findAll(): Promise<ResultPrenotazione[]> {
		return await this.prenotazioniService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Recupera una prenotazione' })
	@ApiResponse({ status: 200, type: ResultPrenotazione })
	async findOne(@Param('id') id: string): Promise<ResultPrenotazione> {
		return await this.prenotazioniService.findOne(+id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Aggiorna una prenotazione' })
	@ApiResponse({ status: 200, type: ResultPrenotazione })
	async update(@Param('id') id: string, @Body() updatePrenotazioniDto: UpdatePrenotazioniDto) {
		return await this.prenotazioniService.update(+id, updatePrenotazioniDto);
	}
}
