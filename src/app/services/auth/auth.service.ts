import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

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


  // !Login al Modulo
  LoginDocente(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData))
        .catch(error => reject(error));
    })
      .then(() => {
        this.fechaLogin = new Date().toString();
      })
      .catch(
        (error) => console.log('Error en inicio de sesión: ' + error)
      );
  }

  getAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  getFechaLogin() {
    return this.fechaLogin;
  }
}
