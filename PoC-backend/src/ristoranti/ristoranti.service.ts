import { Injectable } from '@nestjs/common';
import { Giorno, Orario } from './entities/orario.entity';
import { Ristorante } from './entities/ristoranti.entity';
import { CreateRistorantiDto } from './dto/create-ristoranti.dto';
import { ResultRistorante } from './entities/result-ristoranti.entity';
import { utente, ristorante, citta, tag, cucina, orario, giorno_enum, prenotazione, ordinazione, piatto } from '../db/schema';
import { db } from '../db';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class RistorantiService {
	async create(createRistorantiDto: CreateRistorantiDto): Promise<ResultRistorante> {

		// insert the user
		let user_id = await db.insert(utente)
			.values({
				email: createRistorantiDto.email,
				username: createRistorantiDto.name,
				password: createRistorantiDto.password,
			}).returning()
			.then((utente) => {
				return {
					result: true,
					id: utente[0].id
				}
			})
			.catch((_) => {
				return {
					result: false,
					id: null
				}
			})

		if (!user_id.result) {
			return {
				result: false,
				message: "Email già in uso",
			}
		}

		// insert the city
		let citta_id = await db.insert(citta)
			.values({
				nome: createRistorantiDto.city,
			}).returning().then((citta) => {
				return citta[0].id
			}).catch(async (_) => {
				let city = await db.select()
					.from(citta)
					.where(eq(citta.nome, createRistorantiDto.city))

				return city[0].id
			})

		// insert the restaurant
		let restaurant = {
			id: user_id.id,
			nome: createRistorantiDto.name,
			citta: citta_id,
			indirizzo: createRistorantiDto.address,
			foto: createRistorantiDto.photo,
			telefono: createRistorantiDto.telephone,
			website: createRistorantiDto.website,
			sedie_per_bambini: createRistorantiDto.kids,
			adatto_ai_disabili: createRistorantiDto.disabili,
			descrizione: createRistorantiDto.description,
		}

		let rest = await db.insert(ristorante)
			.values(restaurant)
			.returning().then((ristorante) => {
				return {
					result: true,
					ristorante: ristorante[0]
				}
			}).catch((_) => {
				return {
					result: false,
					message: "Indirizzo già in uso",
					ristorante: null
				}
			})

		if (!rest.result) {
			return {
				result: false,
				message: "Indirizzo già in uso",
			}
		}

		// insert the tags
		if (createRistorantiDto.tags) {
			for (let name of createRistorantiDto.tags) {
				let tag_id = await db
					.insert(tag)
					.values({
						nome: name,
					}).returning().then((tag) => {
						return tag[0].id
					}).catch(async (_) => {
						return await db.select()
							.from(tag)
							.where(eq(tag.nome, name))
							.then((tag) => {
								return tag[0].id
							})
					})

				// ora t[0] è il tag
				await db.insert(cucina)
					.values({
						id_tag: tag_id,
						id_ristorante: rest.ristorante.id,
					}).execute();
			}
		}

		// insert the opening hours
		if (createRistorantiDto.apertura) {
			for (let o of createRistorantiDto.apertura) {
				await db.insert(orario)
					.values({
						id_ristorante: user_id.id,
						giorno: giorno_enum[o.day],
						apertura: date_to_time(o.begin),
						chiusura: date_to_time(o.end),
					}).execute();
			}
		}

		return this.findOne(rest.ristorante.id);
	}

	async findOne(id: number): Promise<ResultRistorante> {
		let r = await db.select().from(ristorante).where(eq(ristorante.id, id))
		if (r.length == 0) {
			return {
				result: false,
				message: "Ristorante non trovato",
			}
		}

		let ts = await db.select({
			nome: tag.nome
		})
			.from(tag)
			.innerJoin(cucina, eq(cucina.id_tag, tag.id))
			.where(eq(cucina.id_ristorante, id))

		let tags = ts.map(t => t.nome);

		let os = await db.select({
			day: orario.giorno,
			begin: orario.apertura,
			end: orario.chiusura,
		}).from(orario).where(eq(orario.id_ristorante, id))

		let opening: Orario[] = os.map(o => {
			return {
				day: convert_string_to_giorno(o.day),
				begin: time_to_date(o.begin),
				end: time_to_date(o.end),
			}
		})

		let city = await db.select({
			name: citta.nome
		}).from(citta).where(eq(citta.id, r[0].citta))

		// deve essere riscritto come una query
		// chissa se funziona
		let costo_totale = await db.select(
			{
				prenotazione: prenotazione.id,
				costo: sql<number>`sum(${piatto.prezzo} * ${ordinazione.quantita})`,
				numero_persone: prenotazione.numero_persone,
			}
		)
			.from(prenotazione)
			.where(eq(prenotazione.id_ristorante, id))
			.innerJoin(ordinazione, eq(prenotazione.id, ordinazione.id_prenotazione))
			.innerJoin(piatto, eq(ordinazione.id_piatto, piatto.id))
			.groupBy(prenotazione.id)

		let mean = costo_totale.reduce((acc, curr) => acc + curr.costo / curr.numero_persone, 0) / costo_totale.length;

		if (isNaN(mean)) {
			mean = 0;
		}

		let restaurant: Ristorante = {
			id: r[0].id,
			name: r[0].nome,
			city: city[0].name,
			address: r[0].indirizzo,
			photo: r[0].foto as JSON,
			telephone: r[0].telefono,
			website: r[0].website,
			cost: mean,
			kids: r[0].sedie_per_bambini,
			disabili: r[0].adatto_ai_disabili,
			description: r[0].descrizione,
			tags: tags,
			apertura: opening,
		}

		return {
			result: true,
			message: "Ristorante trovato",
			restaurant: restaurant,
		}
	}

	async update(id: number, updateRistorantiDto: CreateRistorantiDto): Promise<ResultRistorante> {
		let r = await db.update(ristorante)
			.set(updateRistorantiDto)
			.where(eq(ristorante.id, id))
			.returning();

		if (r.length == 0) {
			return {
				result: false,
				message: "Ristorante non trovato",
			}
		}

		return this.findOne(id);
	}

	async remove(id: number): Promise<ResultRistorante> {
		await db.delete(ristorante)
			.where(eq(ristorante.id, id))

		let r = await this.findOne(id);

		if (!r.result) {
			return {
				result: false,
				message: "Ristorante non trovato",
			}
		}
		return {
			result: true,
			message: "Ristorante eliminato",
		}
	}
}

function date_to_time(date: Date): string {
	let h = date.getHours();
	let m = date.getMinutes();
	const formatted_minutes = String(m).padStart(2, '0');
	const formatted_hours = String(h).padStart(2, '0');
	return `${formatted_hours}:${formatted_minutes}`;
}

function time_to_date(time: string): Date {
	let [h, m] = time.split(':');
	return new Date(0, 0, 0, Number(h), Number(m));
}

function convert_string_to_giorno(s: string): Giorno {
	switch (s) {
		case "Lunedì":
			return Giorno.Lunedi;
		case "Martedì":
			return Giorno.Martedi;
		case "Mercoledì":
			return Giorno.Mercoledi;
		case "Giovedì":
			return Giorno.Giovedi;
		case "Venerdì":
			return Giorno.Venerdi;
		case "Sabato":
			return Giorno.Sabato;
		case "Domenica":
			return Giorno.Domenica;
	}
}
