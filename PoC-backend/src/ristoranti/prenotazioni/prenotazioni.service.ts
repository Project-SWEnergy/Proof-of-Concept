import { Injectable } from '@nestjs/common';
import { UpdatePrenotazioniDto } from './dto/update-prenotazioni.dto';
import { ResultPrenotazione } from './entities/result-prenotazioni.entity';
import { Prenotazione } from './entities/prenotazioni.entity';
import { utente, ristorante, prenotazione, prenotazione_utente } from '../../db/schema';
import { db } from '../../db';
import { eq, sql } from 'drizzle-orm';
import { StatoPrenotazione } from './dto/stato-prenotazione.dto';

@Injectable()
export class PrenotazioniService {
	async findAll(): Promise<Prenotazione[]> {
		return await db.select()
			.from(prenotazione)
			.innerJoin(prenotazione_utente, eq(prenotazione_utente.id_prenotazione, prenotazione.id))
			.innerJoin(utente, eq(prenotazione_utente.id_utente, utente.id))
			.innerJoin(ristorante, eq(prenotazione.id_ristorante, ristorante.id))
			.then((result) => {
				if (result.length == 0) {
					return [] as Prenotazione[]
				}
				return result.map((p) => {
					return {
						id: p.prenotazione.id,
						username: p.utente.username,
						restaurantId: p.ristorante.id,
						restaurantName: p.ristorante.nome,
						date: p.prenotazione.data_e_ora,
						seats: p.prenotazione.numero_persone,
						status: StatoPrenotazione[p.prenotazione.stato],
						kids: p.prenotazione.bimbi,
						disabili: p.prenotazione.disabili,
					}
				})
			}).catch((_) => {
				return [] as Prenotazione[]
			})
	}




	mapDatabaseValueToStatoPrenotazione(value: string): StatoPrenotazione | undefined {
		switch (value) {
			case "Da confermare":
				return StatoPrenotazione.da_confermare;
			case "Rifiutato":
				return StatoPrenotazione.rifiutato;
			case "Annullato":
				return StatoPrenotazione.annullato;
			case "In attesa":
				return StatoPrenotazione.in_attesa;
			case "In corso":
				return StatoPrenotazione.in_corso;
			case "Concluso":
				return StatoPrenotazione.concluso;
			default:
				// Gestisci il caso in cui il valore non sia mappato
				console.error(`Valore non mappato: ${value}`);
				return undefined;
		}
	}

	async findByDate(date: Date): Promise<Prenotazione[]> {
		const day = Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		}).format(date)

		return await db.select()
			.from(prenotazione)
			.where(sql`DATE(${prenotazione.data_e_ora}) = ${day}`)
			.innerJoin(prenotazione_utente, eq(prenotazione_utente.id_prenotazione, prenotazione.id))
			.innerJoin(utente, eq(prenotazione_utente.id_utente, utente.id))
			.innerJoin(ristorante, eq(prenotazione.id_ristorante, ristorante.id))
			.then((result) => {
				if (result.length == 0) {
					return [] as Prenotazione[]
				}
				return result.map((p) => {
					const statoPrenotazione = this.mapDatabaseValueToStatoPrenotazione(p.prenotazione.stato);
					return {
						id: p.prenotazione.id,
						username: p.utente.username,
						restaurantId: p.ristorante.id,
						restaurantName: p.ristorante.nome,
						date: p.prenotazione.data_e_ora,
						seats: p.prenotazione.numero_persone,
						status: statoPrenotazione || StatoPrenotazione.da_confermare, 
						kids: p.prenotazione.bimbi,
						disabili: p.prenotazione.disabili,
					}
				})
			}).catch((_) => {
				return [] as Prenotazione[]
			})
	}

	async findOne(id: number): Promise<ResultPrenotazione> {
		return await db.select()
			.from(prenotazione)
			.where(eq(prenotazione.id, id))
			.innerJoin(prenotazione_utente, eq(prenotazione_utente.id_prenotazione, prenotazione.id))
			.innerJoin(utente, eq(prenotazione_utente.id_utente, utente.id))
			.innerJoin(ristorante, eq(prenotazione.id_ristorante, ristorante.id))
			.then((result) => {
				if (result.length == 0) {
					return {
						result: false,
						message: 'Prenotazione non trovata'
					}
				}
				return {
					result: true,
					message: 'Prenotazione trovata',
					prenotazione: {
						id: result[0].prenotazione.id,
						username: result[0].utente.username,
						restaurantId: result[0].ristorante.id,
						restaurantName: result[0].ristorante.nome,
						date: result[0].prenotazione.data_e_ora,
						seats: result[0].prenotazione.numero_persone,
						status: StatoPrenotazione[result[0].prenotazione.stato],
						kids: result[0].prenotazione.bimbi,
						disabili: result[0].prenotazione.disabili,
					}
				}
			}).catch((_) => {
				return {
					result: false,
					message: 'Prenotazione non trovata'
				}
			})
	}

	async update(updatePrenotazioniDto: UpdatePrenotazioniDto): Promise<ResultPrenotazione> {
		const statoPrenotazione = this.mapDatabaseValueToStatoPrenotazione(updatePrenotazioniDto.status);
		return await db.update(prenotazione)
			.set({
				data_e_ora: new Date(updatePrenotazioniDto.date),
				numero_persone: updatePrenotazioniDto.seats,
				stato: statoPrenotazione || StatoPrenotazione.da_confermare, 
				bimbi: updatePrenotazioniDto.kids,
				disabili: updatePrenotazioniDto.disabili,
			})
			.where(eq(prenotazione.id, updatePrenotazioniDto.reservationId))
			.returning()
			.then((result) => {
				if (result.length == 0) {
					return {
						result: false,
						message: 'Prenotazione non trovata'
					}
				}
				return this.findOne(updatePrenotazioniDto.reservationId)
			}).catch((_) => {
				return {
					result: false,
					message: 'Prenotazione non trovata'
				}
			})
	}
}

function stato_prenotazione_to_enum(sp: StatoPrenotazione): 'Da confermare' | 'Rifiutato' | 'Annullato' | 'In attesa' | 'In corso' | 'Concluso' {
	switch (sp) {
		case StatoPrenotazione.da_confermare:
			return 'Da confermare'
		case StatoPrenotazione.rifiutato:
			return 'Rifiutato'
		case StatoPrenotazione.annullato:
			return 'Annullato'
		case StatoPrenotazione.in_attesa:
			return 'In attesa'
		case StatoPrenotazione.in_corso:
			return 'In corso'
		default:
			return 'Concluso'
	}
}
