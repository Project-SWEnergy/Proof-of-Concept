import { Controller, Get, Param } from '@nestjs/common';
import { PiattiService } from './piatti.service';
import { Piatti } from './piatti.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('utenti/piatti')
@Controller('utenti/piatti')
export class PiattiController {
	constructor(private readonly piattiService: PiattiService) { }

	@Get(':id')
	@ApiOperation({ summary: 'Lista dei piatti' })
	@ApiResponse({ status: 200, type: [Piatti] })
	async findAll(@Param('id') restaurant_id: string): Promise<Piatti[]> {
		return await this.piattiService.findAll(+restaurant_id);
	}
}
