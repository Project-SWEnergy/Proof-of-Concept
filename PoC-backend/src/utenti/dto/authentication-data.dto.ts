import { ApiProperty } from "@nestjs/swagger";

/**
 * @property {boolean} userExists - Indica se l'autenticazione ha avuto successo.
 * @property {string} returnMessage - Messaggio associato al risultato dell'autenticazione.
 * @property {string} userType - Tipo di utente riconosciuto dal sistema.
 */
export class AuthenticationResult {
	@ApiProperty()
	authResult: boolean;
	@ApiProperty()
	returnMessage: string;
	@ApiProperty()
	userType: UserType;
}

/**
 * @property {string} username - Username fornito da utente
 * @property {string} password - Password fornita da utente
 */
export class AuthenticationDataDto {
	@ApiProperty()
	readonly email: string;
	@ApiProperty()
	readonly password: string;
}

export enum UserType {
	Restaurateur = "restaurateur",
	Client = "client"
}
