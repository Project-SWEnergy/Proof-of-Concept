import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UserType } from '../../interfaces/authentication';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public hidePassword: boolean = true;
  private authResult: boolean = false;
  private urlRestaurateurHome: string = '/restaurateur-home';
  private urlClientHome: string = '/client-home';

  loginService: LoginService = inject(LoginService);

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  }
  );

  constructor(private router: Router) { }

  onSubmit() {
    //console.log("submit");
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      this.loginService.authenticateUser(formData.username ?? '', formData.password ?? '')
        .then(authResult => {
          this.manageAuthtentication(authResult);
        })
        .catch(error => {
          console.error('Errore durante il login:', error);
        });
    }
  }

  manageAuthtentication(authResult: any): void {
    if (authResult.userExist) {
      window.alert(authResult.returnMessage);
      this.loginService.setIsAuthenticated(true);
      if (authResult.userType == UserType.Client)
        this.router.navigate([this.urlClientHome]);
      else if (authResult.userType == UserType.Restaurateur)
        this.router.navigate([this.urlRestaurateurHome]);
    }
    else {
      this.loginService.setIsAuthenticated(false);
      window.alert(authResult.returnMessage);
    }
  }
}
