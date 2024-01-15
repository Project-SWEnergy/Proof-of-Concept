import { Controller, Post, Body } from '@nestjs/common';
import { PiattiService } from './piatti.service';
import { CreatePiattiDto } from './dto/create-piatti.dto';
import { Piatti } from './entities/piatti.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('ristoranti/piatti')
@Controller('ristoranti/piatti')
export class PiattiController {
	constructor(private readonly piattiService: PiattiService) { }

	@Post()
	@ApiOperation({ summary: 'Crea un nuovo piatto' })
	@ApiResponse({ status: 201, type: Piatti })
	async create(@Body() createPiattiDto: CreatePiattiDto): Promise<Piatti> {
		return await this.piattiService.create(createPiattiDto);
	}

	//  @Get()
	//  findAll() {
	//    return this.piattiService.findAll();
	//  }
	//
	//  @Get(':id')
	//  findOne(@Param('id') id: string) {
	//    return this.piattiService.findOne(+id);
	//  }
	//
	//  @Patch(':id')
	//  update(@Param('id') id: string, @Body() updatePiattiDto: UpdatePiattiDto) {
	//    return this.piattiService.update(+id, updatePiattiDto);
	//  }
	//
	//  @Delete(':id')
	//  remove(@Param('id') id: string) {
	//    return this.piattiService.remove(+id);
	//  }
}
