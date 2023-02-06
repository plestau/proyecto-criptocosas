import { Component } from '@angular/core';
import { Firestore, collectionData, collection, query, where, setDoc, doc, getFirestore, deleteDoc } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primeras',
  templateUrl: './primeras.component.html',
  styleUrls: ['./primeras.component.css']
})
export class PrimerasComponent {
  db = getFirestore();
  sesionIniciada : string = this.auth.isLoged;
  isLoged:any;
  arrayBuscar$: Observable<any>;
  emailUsuario = '';
  esFav: boolean = false;
  constructor(firestore: Firestore, private auth:AuthService, private router:Router, private http: HttpClient) {
    this.auth.comprobarSiEstaLogeado()
      if (this.auth.isLoged != null) {
        this.verInfoPrimeras();
        // intervalo para que se actualice cada 5 segundos
        // setInterval(() => {
        //   this.verInfoPrimeras();
        // }, 5000);
      }
    const collectionBD = collection(firestore, 'items');
    this.arrayBuscar$ = collectionData(query(collectionBD, where("nombre", "==", this.emailUsuario)));
  }
  ngOnInit() {
    if (this.auth.isLoged == false) {
      this.router.navigate(['/login']);
    }
    else{
      this.verInfoPrimeras();
    }
  }
  primeras = new Array<any>();

  verInfoPrimeras() {
    this.auth.getInfoPrimeras().subscribe(
      (json:any) => {
      // Consulta firestore para saber las monedas favoritas del usuario
      this.emailUsuario = this.auth.isLoged.email;
      const collectionBD = collection(this.db, 'items');
      this.arrayBuscar$ = collectionData(query(collectionBD, where("nombre", "==", this.emailUsuario)));
      this.arrayBuscar$.subscribe(
        (json2:any) => {
          // Recorremos el array de monedas favoritas
          for (let i = 0; i < json2.length; i++) {
            // Recorremos el array de monedas de la api
            for (let j = 0; j < json.length; j++) {
              // Si la moneda de la api es igual a la moneda favorita del usuario
              if (json[j].id == json2[i].moneda) {
                // Cambiamos el valor de esFav a true
                json[j].esFav = true;
              }
            }
          }
        });
        this.primeras = json;
      }
    );
  }

  guardarFavorito(id:string){
    setDoc(doc(this.db, "items", id+this.auth.isLoged.email), {
      moneda: id,
      nombre: this.auth.isLoged.email,
      esFav: true
    });
    alert("Se ha guardado la moneda en favoritos");
    // cambia el icono de favorito
    this.cambiarIcono(id);
  }

  borrarFavorito(id:string){
    deleteDoc(doc(this.db, "items", id+this.auth.isLoged.email));
    alert("Se ha borrado la moneda de favoritos");
    this.cambiarIcono(id);
  }

  cambiarIcono(id:string){
    for (let i = 0; i < this.primeras.length; i++) {
      if (this.primeras[i].id == id) {
        this.primeras[i].esFav = !this.primeras[i].esFav;
      }
    }
  }
} 
