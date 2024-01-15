import { Injectable } from '@nestjs/common';
import { CreatePiattiDto } from './dto/create-piatti.dto';
import { UpdatePiattiDto } from './dto/update-piatti.dto';
import { Piatti } from './entities/piatti.entity';
import { piatto } from '../../db/schema';
import { db } from '../../db';
import { eq } from 'drizzle-orm';

@Injectable()
export class PiattiService {
	async create(createPiattiDto: CreatePiattiDto): Promise<Piatti> {
		return await db.insert(piatto)
			.values({
				nome: createPiattiDto.name,
				descrizione: createPiattiDto.description,
				prezzo: createPiattiDto.price,
				foto: createPiattiDto.image,
				id_ristornte: createPiattiDto.restaurantId
			}).returning()
			.then((piatto) => {
				if (piatto.length === 0) {
					return null;
				}
				return {
					id: piatto[0].id,
					name: piatto[0].nome,
					description: piatto[0].descrizione,
					price: piatto[0].prezzo,
					image: piatto[0].foto as JSON,
					restaurantId: piatto[0].id_ristornte,
					ingredients: [] as string[]
				}
			})
	}

	// findAll() {
	//   return `This action returns all piatti`;
	// }

	// findOne(id: number) {
	//   return `This action returns a #${id} piatti`;
	// }

	// update(id: number, updatePiattiDto: UpdatePiattiDto) {
	//   return `This action updates a #${id} piatti`;
	// }

	// remove(id: number) {
	//   return `This action removes a #${id} piatti`;
	// }
}
