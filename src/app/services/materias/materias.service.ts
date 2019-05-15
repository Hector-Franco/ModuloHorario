import { Injectable } from '@angular/core';
import { Materia } from 'src/app/models/materia.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { Estudiante } from 'src/app/models/estudiante.interface';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(private afd: AngularFireDatabase) {
  }

  /*   public datosDelEstudiante() {
      this.authService.getAuth().subscribe(
        auth => {
          if (auth) {
            this.http.get(`https://modulo-horario.firebaseio.com/estudiantes/${auth.uid}.json`)
              .subscribe((estudiante: any) => {
                this.programa = estudiante.programa;
                this.semestre = estudiante.semestre;
              });

          } else {

          }
        }
      );
    }
   */
  public getMaterias(programa: string) {

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

  public crearHorario(materias: Materia) { }

  public getHorario(idHorario: string) { }



}
