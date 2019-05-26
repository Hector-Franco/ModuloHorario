import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/services/materias/materias.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Docente } from 'src/app/models/docente.interface';
import { ProfesoresService } from 'src/app/services/profesores/profesores.service';
import { Materia } from 'src/app/models/materia.interface';
import { Horario } from 'src/app/models/horario.interface';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  profesor = firebase.auth().currentUser;
  nombre: string;
  disponible: boolean;
  cHorario: boolean;
  vHorario: boolean;
  ambos = false;
  mensajeDisponibilidad: string;

  getMateria: boolean;
  error: boolean;
  agregar: boolean;
  materia: Materia[];
  materiaNombre: string;

  dias: Dia[] = [];
  horario: any[] = [];


  codigoMateria: string;

  diaNumero = 1;
  diaHecho: boolean;
  diaPosible = true;

  materiasInscritas = 0;

  constructor(private materiasService: MateriasService,
              private authService: AuthService,
              private profeService: ProfesoresService,
              private afd: AngularFireDatabase) {

    this.nombre = this.profesor.displayName;
  }

  ngOnInit() {
    if (this.nombre == null) {
      this.nombre = this.profesor.email;
    }
    this.isDisponble();
  }

  isDisponble() {
    this.profeService.isAvailable(this.profesor.uid)
      .then((profesor: Docente) => {
        this.disponible = profesor[2];
        if (this.disponible) {
          this.mensajeDisponibilidad = 'Aun no tiene un horario asignado. Puede hacerlo aquí';
        } else {
          this.mensajeDisponibilidad = 'Horario asignado';
        }
      })
      .catch((error) => console.log(error));
  }

  verMateriaCarreraID(carrera: string, materiaID: string) {
    if (carrera === '' || materiaID === '') {
      this.error = true;
      this.getMateria = false;
    } else {
      this.materiasService.getMateria(carrera, materiaID.toUpperCase())
      .then((materia: any[]) => {
        if (materia.length !== 0) {
          this.getMateria = true;
          this.materia = materia;
          this.agregar = false;
          this.codigoMateria = materia[0];
          this.materiaNombre = materia[2];
        } else {
          this.error = true;
          this.getMateria = false;
          this.agregar = false;
        }
      })
      .catch((error) => console.log(error));
    }

  }

  agregarMateria() {
    this.agregar = true;
    this.dias = [];
    this.horario = [];
    this.diaNumero = 1;
    this.diaHecho = false;
    this.diaPosible = true;
  }

  crearHorario() {
    this.cHorario = true;
    this.vHorario = false;
  }
  verHorario() {
    this.cHorario = false;
    this.vHorario = true;

    this.profeService.getHorario(this.profesor.uid)
    .then((horarios: any[]) => {
      console.log();

    })
    .catch((error) => {
      console.log(error);
    });
  }


  agregarDia(diaS: string, horaS: string) {

    const dia: Dia = {
      dia: diaS,
      hora: horaS
    };

    console.log(dia);
    console.log(this.dias);
    this.dias.push(dia);
    this.diaNumero ++;
    this.diaHecho = true;

    if (this.diaNumero > 5) {
      this.diaPosible = false;
    }
  }

  aceptarMateria() {
    this.horario.push(this.dias);
    this.afd.database
    .ref('/profesores/' + this.profesor.uid + '/horarios/' + this.codigoMateria)
    .update(this.dias)
    .then(() => {
      this.getMateria = false;
      this.agregar = false;
      this.materiasInscritas ++;
    })
    .catch((error) => console.error(error));
  }

  aceptarHorario() {
    this.disponible = false;
    this.afd.database
    .ref('/profesores/' + this.profesor.uid )
    .update({
      disponible: false
    })
    .then(() => console.log('Horario generado con éxito'))
    .catch((error) => console.error(error));
  }

}

export interface Dia {
  dia: string;
  hora: string;
}

export interface Horario {
  dia: Dia[];
}
