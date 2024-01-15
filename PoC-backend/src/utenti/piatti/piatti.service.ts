import { Injectable } from '@nestjs/common';
import { Piatti } from './piatti.entity';
import { db } from '../../db';
import { piatto } from '../../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PiattiService {
	async findAll(restaurant_id: number): Promise<Piatti[]> {
		return await db.select()
			.from(piatto)
			.where(eq(piatto.id_ristornte, restaurant_id))
			.then((row) => {
				if (row.length == 0) {
					return [] as Piatti[]
				}
				return row.map((piatto) => {
					return {
						id: piatto.id,
						name: piatto.nome,
						price: piatto.prezzo,
						image: piatto.foto,
						restaurantId: piatto.id_ristornte,
						description: piatto.descrizione,
						ingredients: [] as string[]
					} as Piatti
				})
			}).catch((_) => {
				return [] as Piatti[]
			})
	}
}
