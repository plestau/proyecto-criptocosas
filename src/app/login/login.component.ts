import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth:AuthService) { }
  email = '';
  password = '';
  iniciarSesion() {
    this.auth.iniciarSesionEmail(this.email, this.password);
  }
  registrate() {
    this.auth.registrate(this.email, this.password);
  }
  iniciarSesionGoogle() {
    this.auth.iniciarSesionGoogle();
  }
}
