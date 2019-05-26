import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  constructor(private afd: AngularFireDatabase) {

  }

  public isAvailable(profesorId: string) {
    return new Promise((resolve, reject) => {
      this.afd.list(`/profesores/${profesorId}`)
        .valueChanges()
        .subscribe((profesor) => resolve(profesor));
    });
  }


  public getHorario(id: string) {
    return new Promise((resolve, reject) => {
      this.afd.list(`/profesores/${id}/horarios`)
      .valueChanges()
      .subscribe((horarios) => {
        console.log(JSON.stringify(horarios));
        resolve(horarios);
      } );
    });
  }

}
