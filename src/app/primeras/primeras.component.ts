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
        this.primeras = json;
      }
    );
  }

  guardarFavorito(id:string){
    setDoc(doc(this.db, "items", id+this.auth.isLoged.email), {
      moneda: id,
      nombre: this.auth.isLoged.email
    });
    alert("Se ha guardado la moneda en favoritos");
  }

  borrarFavorito(id:string){
    deleteDoc(doc(this.db, "items", id+this.auth.isLoged.email));
    alert("Se ha borrado la moneda de favoritos");
  }
} 
