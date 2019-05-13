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

  private programa: string;
  private semestre: string;

  constructor(private afd: AngularFireDatabase,
              private authService: AuthService,
              private http: HttpClient) {

    this.datosDelEstudiante();

  }

  public datosDelEstudiante() {
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

  public getMaterias() {
    console.log(this.programa);
    console.log(this.semestre);
    return new Promise((resolve, reject) => {
      this.afd.list(`/materias/${this.programa}/${this.semestre}`)
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

  public getMateria(idMateria: string) {
    return new Promise((resolve, reject) => {
      this.afd.list(`/materias/${this.programa}/${this.semestre}/${idMateria}`)
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

  public getPrograma() {
    return this.programa;
  }

  public getSemestre() {
    return this.semestre;
  }


}
