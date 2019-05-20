import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase';

import { AngularFireDatabase } from '@angular/fire/database';
import { Docente } from 'src/app/models/docente.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  constructor(private authService: AuthService,
              private afd: AngularFireDatabase) {

  }

  public isAvailable(profesorId: string) {
    return new Promise((resolve, reject) => {
      this.afd.list(`/profesores/${profesorId}`)
        .valueChanges()
        .subscribe(
          (profesor) => {
            console.log(profesor);
            resolve(profesor);
          }
        );
    });
  }
}
