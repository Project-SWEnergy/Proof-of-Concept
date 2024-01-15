import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RistorantiService } from './ristoranti.service';
import { CreateRistorantiDto, Result, RistoranteDto } from './dto/create-ristoranti.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('utenti/ristoranti')
@Controller('utenti/ristoranti')
export class RistorantiController {
	constructor(private readonly ristorantiService: RistorantiService) { }

	@Get()
	@ApiOperation({ summary: 'Restituisce tutti i ristoranti', description: 'Restituisce un array di oggetti contenenti tutti i ristoranti presenti nel database' })
	@ApiResponse({ status: 200, type: [RistoranteDto] })
	async findAll(): Promise<RistoranteDto[]> {
		return await this.ristorantiService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Restituisce un ristorante', description: 'Restituisce un oggetto contenente il ristorante con l\'id specificato' })
	@ApiResponse({ status: 200, type: Result<RistoranteDto> })
	async findOne(@Param('id') id: string): Promise<Result<RistoranteDto>> {
		return await this.ristorantiService.findOne(+id);
	}

	@Get('byCity/:city')
	@ApiOperation({ summary: 'Restituisce i ristoranti di una città', description: 'Restituisce un array di oggetti contenenti tutti i ristoranti presenti nel database che si trovano nella città specificata' })
	@ApiResponse({ status: 200, type: [RistoranteDto] })
	async findByCity(@Param('city') city: string): Promise<RistoranteDto[]> {
		return await this.ristorantiService.findByCity(city);
	}

	//	@Patch(':id')
	//	@ApiOperation({ summary: 'Aggiorna un ristorante', description: 'Se il ristorante è stato aggiornato correttamente, restituisce un oggetto con il ristorante aggiornato e un messaggio di successo, altrimenti restituisce un messaggio di errore' })
	//	@ApiResponse({ status: 200, type: Result<RistoranteDto> })
	//	async update(@Param('id') id: string, @Body() updateRistorantiDto: CreateRistorantiDto): Promise<Result<RistoranteDto>> {
	//		return await this.ristorantiService.update(+id, updateRistorantiDto);
	//	}
	//
	//	@Delete(':id')
	//	@ApiOperation({ summary: 'Elimina un ristorante', description: 'Se il ristorante è stato eliminato correttamente, restituisce un messaggio di successo, altrimenti restituisce un messaggio di errore' })
	//	@ApiResponse({ status: 200, type: Result<RistoranteDto> })
	//	async remove(@Param('id') id: string): Promise<Result<RistoranteDto>> {
	//		return await this.ristorantiService.remove(+id);
	//	}
}
