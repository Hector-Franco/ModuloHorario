import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { Estudiante } from 'src/app/models/estudiante.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  fechaLogin: any;

  constructor(private afAuth: AngularFireAuth,
              private afd: AngularFireDatabase) {

  }

  // !Salir del Modulo
  logOut() {
    return this.afAuth.auth.signOut();
  }

  // !Registrar Estudiante
  registrarEstudiante(estudiante: Estudiante) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(estudiante.eMail, estudiante.password)
        .then(userData => resolve(userData),
          error => reject(error));
    })
      .then((data) => {
        this.auth(estudiante);
      })
      .catch(
        (error) => console.log('Error en el registro del Estudiante: ' + error)
      );
  }

  // !Login al Modulo
  LoginEstudiante(estudiante: Estudiante) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(estudiante.eMail, estudiante.password)
        .then(userData => resolve(userData))
        .catch(error => reject(error));
    })
      .then((data) => {
        this.fechaLogin = new Date().toString();
      })
      .catch(
        (error) => console.log('Error en inicio de sesión: ' + error)
      );
  }

  // !Obtener Info del Estudiante
  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  auth(estudiante: Estudiante) {
    firebase.auth().onAuthStateChanged(
      (logged) => {
        if (logged) {
          this.afd.object('/estudiantes/' + logged.uid).update(estudiante)
            .then((data) => {
              logged.updateProfile({
                displayName: estudiante.nombre
              })
              .then((data1) => {})
              .catch((error) => console.log('Error en nombre: ' + error));
            })
            .catch((error) => console.log('Error creando Estudiante: ' + error));

        } else {
          console.log('Usuario no Loggeado');
        }
      }
    );
  }


  getFechaLogin() {
    return this.fechaLogin;
  }
}
