import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RistorantiService } from './ristoranti.service';
import { CreateRistorantiDto } from './dto/create-ristoranti.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResultRistorante } from './entities/result-ristoranti.entity';

@ApiTags('ristoranti')
@Controller('ristoranti')
export class RistorantiController {
	constructor(private readonly ristorantiService: RistorantiService) { }

	@Post()
	@ApiOperation({ summary: 'Crea un nuovo ristorante', description: 'Se il ristorante è stato creato correttamente, restituisce un oggetto con il ristorante creato e un messaggio di successo, altrimenti restituisce un messaggio di errore' })
	@ApiResponse({ status: 201, type: ResultRistorante })
	async create(@Body() createRistorantiDto: CreateRistorantiDto): Promise<ResultRistorante> {
		return await this.ristorantiService.create(createRistorantiDto);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Restituisce il ristorante con l\'id specificato', description: 'Se il ristorante è stato trovato, restituisce un oggetto con il ristorante trovato e un messaggio di successo, altrimenti restituisce un messaggio di errore' })
	@ApiResponse({ status: 200, type: ResultRistorante })
	findOne(@Param('id') id: string): Promise<ResultRistorante> {
		return this.ristorantiService.findOne(+id);
	}
}
