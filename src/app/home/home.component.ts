import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private auth:AuthService) { }
  sesionIniciada : string = this.auth.isLoged;
  eligenos (){
    alert("Por favor, dirígete a registro para poder acceder a la aplicación");
  }
}
