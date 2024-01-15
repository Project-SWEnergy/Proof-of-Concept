/**
 * @property {boolean} userExists - Indica se l'autenticazione ha avuto successo.
 * @property {string} returnMessage - Messaggio associato al risultato dell'autenticazione.
 * @property {string} userType - Tipo di utente riconosciuto dal sistema.
 */
export interface AuthenticationResult {
    authResult: boolean,
    returnMessage: string,
    userType: UserType
}

/**
 * @property {string} email - Username fornito da utente
 * @property {string} password - Password fornita da utente
 */
export interface AuthenticationData {
    email: string,
    password: string
}

export enum UserType {
    Restaurateur = "restaurateur",
    Client = "client"
  }