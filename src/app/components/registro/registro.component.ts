import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { Docente } from 'src/app/models/docente.interface';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  email: string;
  ID: string;
  nombre: string;
  apellido: string;
  mostrarNombre: string;
  exito: boolean;
  error: boolean;

  constructor(private authService: AuthService,
    private router: Router,
    private afd: AngularFireDatabase) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.ID = auth.uid;
        this.email = auth.email;
        this.mostrarNombre = auth.displayName;
      }
    });
  }

  // !Ingresar al Modulo
  actualizarPerfil() {
    const usuario = firebase.auth().currentUser;
    const profesor = firebase.database().ref('/profesores/' + usuario.uid);
    profesor.update({
      nombre: this.nombre,
      apellido: this.apellido,
      email: usuario.email,
      ID: usuario.uid
    })
      .then((data) => {
        this.exito = true;
      })
      .catch((error) => {
        this.error = true;
      });

    usuario.updateProfile({
      displayName: `${this.nombre} ${this.apellido}`
    })
      .then(() => console.log('Nombre Actualizado'))
      .catch((error) => console.log(error));

  }

}
