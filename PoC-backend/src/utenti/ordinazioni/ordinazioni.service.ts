import { Injectable } from '@nestjs/common';
import { CreateOrdinazioniDto } from './dto/create-ordinazioni.dto';
import { OrdinazioniResult } from './dto/result-ordinazioni.dto';
import { Ordinazione } from './entities/ordinazioni.entity';
import { Dish } from './entities/dish.entity';
import { ordinazione, prenotazione_utente, utente, piatto } from '../../db/schema';
import { db } from '../../db';
import { eq, and } from 'drizzle-orm';

@Injectable()
export class OrdinazioniService {
	async create(user_id: number, createOrdinazioniDto: CreateOrdinazioniDto): Promise<OrdinazioniResult> {
		// check if the user is a member of the reservation
		let is_in_reservation = await db.select()
			.from(prenotazione_utente)
			.where(and(
				eq(prenotazione_utente.id_utente, user_id),
				eq(prenotazione_utente.id_prenotazione, createOrdinazioniDto.id_prenotazione)))

		if (is_in_reservation.length == 0) {
			return {
				result: false,
				message: "La prenotazione non esiste",
				ordinazione: null
			}
		}


		// add the dishes to the order
		createOrdinazioniDto.dishes.forEach(async (ordine) => {
			await db.insert(ordinazione)
				.values({
					id_utente: user_id,
					id_prenotazione: createOrdinazioniDto.id_prenotazione,
					id_piatto: ordine.dish.id,
					quantita: ordine.quantity
				}).execute()
		})

		let o = await this.findOne(user_id, createOrdinazioniDto.id_prenotazione)

		if (o.result == false) {
			return {
				result: false,
				message: "Errore durante l'ordinazione",
				ordinazione: null
			}
		}

		return {
			result: true,
			message: "Ordinazione effettuata con successo",
			ordinazione: o.ordinazione
		}
	}


	async findOne(user_id: number, reservation_id: number): Promise<OrdinazioniResult> {
		let in_reservation = await db.select()
			.from(prenotazione_utente)
			.where(eq(prenotazione_utente.id_prenotazione, reservation_id))

		if (!in_reservation.map((x) => x.id_utente).includes(user_id)) {
			return {
				result: false,
				message: "La prenotazione non esiste",
				ordinazione: null
			}
		}

		let orders: Ordinazione[] = await Promise.all(in_reservation.map(async (user) => {
			let username = await db.select({
				username: utente.username
			})
				.from(utente)
				.where(eq(utente.id, user.id_utente))

			let dishes = await db.select({
				id: piatto.id,
				nome: piatto.nome,
				descrizione: piatto.descrizione,
				prezzo: piatto.prezzo,
				foto: piatto.foto,
				quantita: ordinazione.quantita
			}).from(ordinazione)
				.innerJoin(piatto, eq(ordinazione.id_piatto, piatto.id))
				.where(and(
					eq(ordinazione.id_utente, user.id_utente),
					eq(ordinazione.id_prenotazione, reservation_id)))

			let piatti_ordinati = dishes.map((dish) => {
				return {
					dish: {
						id: dish.id,
						name: dish.nome,
						description: dish.descrizione,
						price: dish.prezzo,
						image: dish.foto
					} as Dish,
					quantity: dish.quantita
				}
			})

			return {
				user_id: user.id_utente,
				username: username[0].username,
				reservation: reservation_id,
				dishes: piatti_ordinati
			}
		}))

		return {
			result: true,
			message: "Ordinazione trovata",
			ordinazione: orders
		}


	}

	async update(user_id: number, updateOrdinazioniDto: CreateOrdinazioniDto): Promise<OrdinazioniResult> {
		// delete the old dishes
		await db.delete(ordinazione)
			.where(
				and(
					eq(ordinazione.id_utente, user_id),
					eq(ordinazione.id_prenotazione, updateOrdinazioniDto.id_prenotazione)))

		await this.create(user_id, updateOrdinazioniDto)
		return await this.findOne(user_id, updateOrdinazioniDto.id_prenotazione)
	}
}
