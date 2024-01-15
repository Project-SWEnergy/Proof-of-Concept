import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }
  
  loginService: LoginService = inject(LoginService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginService.getIsAuthenticated()) {
      window.alert("Utente autenticato");
      return true;
    }
    else {
      window.alert("Utente non autenticato");
      this.router.navigate(['']);
      return false;
    }
  }
}
