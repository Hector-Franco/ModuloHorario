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

  creditos: number;

  dias: Dia[] = [];
  horario: any[] = [];

  codigoMateria: string;

  diaNumero = 1;
  diaHecho: boolean;
  diaPosible = true;

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
    this.materiasService.getMateria(carrera, materiaID)
      .then((materia: any[]) => {
        if (materia.length !== 0) {
          this.getMateria = true;
          this.materia = materia;
          this.agregar = false;
          this.creditos = materia[1];
          this.codigoMateria = materia[0];
          console.log(this.creditos);
        } else {
          this.error = true;
          this.getMateria = false;
          this.agregar = false;
        }
      })
      .catch((error) => console.log(error));
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

  aceptarHorario() {
    this.horario.push(this.dias);
    console.log(this.horario);
  }

}

export interface Dia {
  dia: string;
  hora: string;
}

export interface Horario {
  dia: Dia[];
}
