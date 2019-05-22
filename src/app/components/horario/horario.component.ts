import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/services/materias/materias.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Docente } from 'src/app/models/docente.interface';
import { ProfesoresService } from 'src/app/services/profesores/profesores.service';
import { Materia } from 'src/app/models/materia.interface';

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

  horario: any[];

  codigoMateria: string;
  dias = ['Lunes', 'Martes'];
  horas = ['8:00', '12:00'];

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

  verMateriaID(materiaID: string) {
    this.materiasService.getMateriasPrograma(materiaID)
      .then((materia: any[]) => {
        if (materia.length !== 0) {
          this.getMateria = true;
          this.materia = materia;
          this.agregar = false;
          this.creditos = materia[1];
          this.codigoMateria = materia[0];
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
    this.generarHorario(this.dias, this.horas);
  }

  crearHorario() {
    this.cHorario = true;
    this.vHorario = false;
  }
  verHorario() {
    this.cHorario = false;
    this.vHorario = true;
  }


  generarHorario(diasS: string[], horas: string[]) {

    const horarios = [];
    const dias = [];

    for (let i = 0; i < diasS.length; i++) {
      const materia = {
        dia: diasS[i],
        hora: horas[i]
      };
      dias.push(materia);
    }

    console.log(dias);
    console.log(horarios);

    firebase.database().ref('/profesores/' + this.profesor.uid + '/horarios/' + this.codigoMateria)
      .set({
        dias
      })
      .then(() => console.log('Horario Creado'))
      .catch((error) => console.log(error));
  }

}
