import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/services/materias/materias.service';
import { Materia } from 'src/app/models/materia.interface';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {


  materia: Materia[];
  materias: Materia[];
  check = false;
  fallo: boolean;
  obtenerMaterias: boolean;
  obtener: boolean;

  constructor(private materiasService: MateriasService) {
  }

  ngOnInit() {
  }

  verMateria(carrera: string, materia: string) {
    if (materia === undefined) {
      this.verCarrera(carrera);
    } else {
      this.verMateriaCarreraID(carrera, materia.toUpperCase());
    }
  }

  verCarrera(carrera: string) {
    this.materiasService.getMateriasPrograma(carrera)
      .then((materia: Materia[]) => {
        if (materia.length === 0) {
          this.fallo = true;
          this.obtener = false;
          console.log('Ingrese una Carrera valida por favor');
        } else {
          this.obtenerMaterias = false;
          this.obtener = true;
          this.fallo = false;
          this.materias = materia;
        }
      })
      .catch(error => console.log(error));
  }

  verMateriaCarreraID(carrera: string, materiaID: string) {
    this.materiasService.getMateria(carrera, materiaID)
      .then((materia: Materia[]) => {
        if (materia.length === 0) {
          this.fallo = true;
          this.obtenerMaterias = false;
          console.log('Ingrese una materia valida por favor');
        } else {
          this.obtener = false;
          this.obtenerMaterias = true;
          this.fallo = false;
          this.materia = materia;
        }
      })
      .catch(error => console.log(error));
  }
}
