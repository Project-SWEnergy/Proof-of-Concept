import { Injectable } from '@nestjs/common';
import { CreateUtentiDto, CreateUtentiResultDto } from './dto/create-utenti.dto';
import { UpdateUtentiDto, UpdateUtentiResultDto } from './dto/update-utenti.dto';
import { AuthenticationDataDto, AuthenticationResult, UserType } from './dto/authentication-data.dto';
import { utente, ristorante } from '../db/schema';
import { db } from '../db';
import { eq } from 'drizzle-orm';

@Injectable()
export class UtentiService {
	async create(createUtentiDto: CreateUtentiDto): Promise<CreateUtentiResultDto> {
		return db.insert(utente)
			.values(createUtentiDto)
			.returning()
			.then((utente) => {
				return {
					result: true,
					message: "Utente creato con successo",
					utente: utente[0]
				}
			}).catch((_) => {
				return {
					result: false,
					message: "Errore nella creazione dell'utente",
					utente: null
				}
			})
	}

	async authenticate(authenticationDataDto: AuthenticationDataDto): Promise<AuthenticationResult> {
		let user = await db.select()
			.from(utente)
			.where(eq(utente.email, authenticationDataDto.email));

		if (user.length == 0) {
			return {
				authResult: false,
				returnMessage: "Non esiste un utente con questa email",
				userType: null
			}
		} else if (user[0].password != authenticationDataDto.password) {
			return {
				authResult: false,
				returnMessage: "Email o password errati",
				userType: null
			}
		}
		let isRestaurateur = await db.select().from(ristorante).where(eq(ristorante.id, user[0].id));
		if (isRestaurateur.length > 0) {
			return {
				authResult: true,
				returnMessage: "Autenticazione riuscita",
				userType: UserType.Restaurateur
			}
		} else {
			return {
				authResult: true,
				returnMessage: "Autenticazione riuscita",
				userType: UserType.Client
			}
		}
	}

	async update(id: number, updateUtentiDto: UpdateUtentiDto): Promise<UpdateUtentiResultDto> {
		return db.update(utente)
			.set({ ...updateUtentiDto })
			.where(eq(utente.id, id))
			.returning()
			.then((utente) => {
				return {
					result: true,
					message: "Utente aggiornato con successo",
					utente: utente[0]
				}
			}).catch((_) => {
				return {
					result: false,
					message: "Errore nell'aggiornamento dell'utente",
					utente: null
				}
			})
	}

	async remove(id: number) {
		return db.delete(utente)
			.where(eq(utente.id, id))
			.returning()
			.then((utente) => {
				return {
					result: true,
					message: "Utente eliminato con successo",
					utente: utente[0]
				}
			}).catch((_) => {
				return {
					result: false,
					message: "Errore nell'eliminazione dell'utente",
					utente: null
				}
			})
	}
}
