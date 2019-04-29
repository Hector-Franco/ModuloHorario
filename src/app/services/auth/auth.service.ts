import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  // !Salir del Modulo
  logOut() {
    return this.afAuth.auth.signOut();
  }

  // !Registrar Estudiante
  registrarEstudiante(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
                      .then(userData => resolve(userData),
                            error => reject(error));
    });
  }

  // !Login al Modulo
  LoginEstudiante(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
          error => reject(error));
    });
  }

  // !Obtener Info del Estudiante
  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

}
