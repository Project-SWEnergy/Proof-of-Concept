import { Injectable } from '@nestjs/common';
import { CreatePrenotazioniDto } from './dto/create-prenotazioni.dto';
import { UpdatePrenotazioniDto } from './dto/update-prenotazioni.dto';
import { ResultPrenotazione } from './entities/result-prenotazione';
import { StatoPrenotazione } from './entities/stato-prenotazione.entity';
import { prenotazione, prenotazione_utente, piatto, ordinazione, ristorante, utente } from '../../db/schema';
import { db } from '../../db';
import { eq } from 'drizzle-orm';
import { Dish } from './entities/dish.entity'


@Injectable()
export class PrenotazioniService {
	async create(createPrenotazioniDto: CreatePrenotazioniDto): Promise<ResultPrenotazione> {
		try {
			let reservation = await db.insert(prenotazione)
				.values({
					id_ristorante: createPrenotazioniDto.restaurantId,
					data_e_ora: new Date(createPrenotazioniDto.date),
					stato: "Da confermare",
					numero_persone: createPrenotazioniDto.seats,
					bimbi: createPrenotazioniDto.kids,
					disabili: createPrenotazioniDto.disabili,
				}).returning()

			await db.insert(prenotazione_utente)
				.values({
					id_prenotazione: reservation[0].id,
					id_utente: 1
				}).execute()

			for (let dish of createPrenotazioniDto.dishes) {
				await db.insert(ordinazione)
					.values({
						id_prenotazione: reservation[0].id,
						id_utente: 1,
						id_piatto: dish.dish.id,
						quantita: dish.quantity
					}).execute()
			}

			return this.findOne(reservation[0].id)

		} catch (e) {
			return {
				result: false,
				message: e
			}
		}
	}

	async findAll(): Promise<ResultPrenotazione[]> {
		let ids = await db.select({
			id: prenotazione.id,
		}).from(prenotazione)
			.then((reservations) => {
				return reservations.map((reservation) => {
					return reservation.id
				})
			})

		return await Promise.all(ids.map(async (id) => {
			return await this.findOne(id)
		}))
	}

	async findOne(id: number): Promise<ResultPrenotazione> {
		return await db.select()
			.from(prenotazione)
			.where(eq(prenotazione.id, id))
			.innerJoin(prenotazione_utente, eq(prenotazione_utente.id_prenotazione, prenotazione.id))
			.innerJoin(utente, eq(utente.id, prenotazione_utente.id_utente))
			.innerJoin(ristorante, eq(ristorante.id, prenotazione.id_ristorante))
			.then(async (reservations) => {
				let dishes = await db.select()
					.from(ordinazione)
					.where(eq(ordinazione.id_prenotazione, reservations[0].prenotazione.id))
					.innerJoin(piatto, eq(piatto.id, ordinazione.id_piatto))
					.then((dishes) => {
						return dishes.map((dish) => {
							return {
								dish: {
									id: dish.piatto.id,
									name: dish.piatto.nome,
									description: dish.piatto.descrizione,
									price: dish.piatto.prezzo,
									image: dish.piatto.foto,
								} as Dish,
								quantity: dish.ordinazione.quantita
							}
						})
					})

				return {
					result: true,
					message: "Prenotazione trovata",
					prenotazione: {
						id: reservations[0].prenotazione.id,
						username: reservations[0].utente.username,
						restaurantId: reservations[0].prenotazione.id_ristorante,
						restaurantName: reservations[0].ristorante.nome,
						date: reservations[0].prenotazione.data_e_ora,
						seats: reservations[0].prenotazione.numero_persone,
						kids: reservations[0].prenotazione.bimbi,
						disabili: reservations[0].prenotazione.disabili,
						dishes: dishes,
						status: StatoPrenotazione[reservations[0].prenotazione.stato]
					}
				}
			}).catch((_) => {
				return {
					result: false,
					message: "Prenotazione non trovata"
				}
			})
	}

	async update(id: number, updatePrenotazioniDto: UpdatePrenotazioniDto): Promise<ResultPrenotazione> {
		const restaurant_id = await db.select({
			id: prenotazione.id_ristorante
		}).from(prenotazione)
			.where(eq(prenotazione.id, id))
			.then((reservations) => {
				return reservations[0].id
			})

		await db.delete(prenotazione)
			.where(eq(prenotazione.id, id))

		return await this.create({
			restaurantId: restaurant_id,
			date: updatePrenotazioniDto.date,
			seats: updatePrenotazioniDto.seats,
			kids: updatePrenotazioniDto.kids,
			disabili: updatePrenotazioniDto.disabili,
			dishes: updatePrenotazioniDto.dishes
		})
	}
}
