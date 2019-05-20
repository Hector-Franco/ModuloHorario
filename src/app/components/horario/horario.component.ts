import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/services/materias/materias.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Docente } from 'src/app/models/docente.interface';
import { ProfesoresService } from 'src/app/services/profesores/profesores.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  profesor = firebase.auth().currentUser;
  nombre: string;
  disponible: boolean;
  mensajeDisponibilidad: string;

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

  


}
