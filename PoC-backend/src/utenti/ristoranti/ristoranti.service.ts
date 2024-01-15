import { Injectable } from '@nestjs/common';
import { Result, RistoranteDto, Orario, Giorno } from './dto/create-ristoranti.dto';
import { ristorante, citta, tag, cucina, orario, giorno_enum, ordinazione, prenotazione, piatto } from '../../db/schema';
import { db } from '../../db';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class RistorantiService {
	async findAll(): Promise<RistoranteDto[]> {
		let ids = await db.select({
			id: ristorante.id
		}).from(ristorante).execute();

		return await Promise.all(ids.map(async id => {
			let r = await this.findOne(id.id);
			if (r.result) {
				return r.data;
			}
		}))


	}

	async findOne(id: number): Promise<Result<RistoranteDto>> {
		let r = await db.select().from(ristorante).where(eq(ristorante.id, id))

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

		let restaurant: RistoranteDto = {
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
			data: restaurant,
		}
	}

	async findByCity(city: string): Promise<RistoranteDto[]> {
		let ids = await db.select({
			id: ristorante.id
		})
			.from(ristorante)
			.innerJoin(citta, eq(ristorante.citta, citta.id))
			.where(eq(citta.nome, city))

		return await Promise.all(ids.map(async id => {
			let r = await this.findOne(id.id);
			if (r.result) {
				return r.data;
			}
		}))

	}

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
