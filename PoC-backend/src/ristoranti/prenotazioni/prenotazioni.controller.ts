import { Controller, Get, Body, Patch, Param, Post } from '@nestjs/common';
import { PrenotazioniService } from './prenotazioni.service';
import { UpdatePrenotazioniDto } from './dto/update-prenotazioni.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Prenotazione } from './entities/prenotazioni.entity';
import { ResultPrenotazione } from './entities/result-prenotazioni.entity';
import { DateDto } from './dto/date.dto';

@ApiTags('ristoranti/prenotazioni')
@Controller('ristoranti/prenotazioni')
export class PrenotazioniController {
	constructor(private readonly prenotazioniService: PrenotazioniService) { }

	@Get()
	@ApiOperation({ summary: 'Lista prenotazioni', description: 'Recupera la lista delle prenotazioni' })
	@ApiResponse({ status: 200, type: [Prenotazione] })
	async findAll(): Promise<Prenotazione[]> {
		return await this.prenotazioniService.findAll();
	}

	@Post()
	@ApiOperation({ summary: 'Restituisce le prenotazione nel giorno passato' })
	@ApiResponse({ status: 200, type: [Prenotazione] })
	async findByDate(@Body() body: DateDto): Promise<Prenotazione[]> {
		return await this.prenotazioniService.findByDate(new Date(body.date));
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
	async update(@Body() updatePrenotazioniDto: UpdatePrenotazioniDto) {
		return this.prenotazioniService.update(updatePrenotazioniDto);
	}
}
