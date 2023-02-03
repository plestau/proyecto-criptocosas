import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  eligenos (){
    alert("Por favor, dirígete a registro para poder acceder a la aplicación");
  }
}
