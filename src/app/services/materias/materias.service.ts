import { Injectable } from '@angular/core';
import { Materia } from 'src/app/models/materia.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(private afd: AngularFireDatabase) {
  }


  public getMaterias() {

    return new Promise((resolve, reject) => {
      this.afd.list(`/materias/`)
        .valueChanges()
        .subscribe((materias) => resolve(materias));
    });
  }

  public getMateriasPrograma(programa: string) {

    return new Promise((resolve, reject) => {
      this.afd.list(`/materias/${programa}`)
        .valueChanges()
        .subscribe(
          materias => {
            console.log(materias);
            resolve(materias);
          }
        );
    }
    );
  }

  public getMateria(programa: string, idMateria: string) {

    return new Promise((resolve, reject) => {
      this.afd.list(`/materias/${programa}/${idMateria}`)
        .valueChanges()
        .subscribe(
          materia => {
            console.log(materia);
            resolve(materia);
          }
        );
    }
    );

  }

  public crearMateria(programa: string, materia: Materia) {

    return new Promise((resolve, reject) => {
      this.afd.database.ref(`/materias/${programa}/${materia.ID}`)
      .set({
        ID: materia.ID,
        nombre: materia.nombre,
        creditos: materia.creditos
      })
      .then((materiaNueva) => resolve(materiaNueva))
      .catch((error) => reject(error));
    });

  }

}
