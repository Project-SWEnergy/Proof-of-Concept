import { Injectable } from '@angular/core';
import axios from './../../../axios-config'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isAuthenticated = false;
  setIsAuthenticated(value: boolean): void {
    this.isAuthenticated = value;
  }
  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  private urlUsers = '/utenti/login'


  /**
  * Verifica un utente nel database basato sullo username e verifica la password.
  * @param {string} username - Lo username dell'utente da cercare nel database.
  * @param {string} password - La password dell'utente da verificare.
  * @returns {Promise<{ userExists: boolean, message?: string }>} Un oggetto che indica se l'utente esiste e, in caso negativo, restituisce l'errore.
  * @throws {Error} Se si verifica un errore durante la richiesta o la gestione della risposta.
  */
  async authenticateUser(username: string, password: string): Promise<{ userExist?: boolean, returnMessage?: string, userType?: string } | undefined > {
      return axios.post(this.urlUsers, { email: username, password: password })
        .then(response => {
          console.log("Response data:" + response.data);
          return {
            userExist: response.data.authResult,
            returnMessage: response.data.returnMessage,
            userType: response.data.userType
          }
        }).catch(err => { 
          console.log("Connection error")
          return {
            userExist: false,
            returnMessage: "Connection error",
            userType: ""
          }
        })
  }



  constructor() { }
}
