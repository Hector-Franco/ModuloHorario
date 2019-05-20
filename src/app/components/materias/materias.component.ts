import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/services/materias/materias.service';
import { Materia } from 'src/app/models/materia.interface';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  materias: Materia[];
  materia: Materia[];
  mat: any[];
  programa: string;
  idMateria: string;
  obtener: boolean;
  obtenerM: boolean;
  fallo: boolean;

  constructor(private materiasService: MateriasService) {
  }

  ngOnInit() {
  }

  verMaterias() {
    if (this.programa != null && this.idMateria != null) {
      this.verMateriaCarreraId(this.programa, this.idMateria);

    } else if ((this.idMateria === '' || this.idMateria == null) && (this.programa != null)) {
      this.verMateriasCarrera(this.programa);

    } else if ((this.programa == null || this.programa === '') && (this.idMateria == null || this.idMateria === '')) {
      this.todasMaterias();
    }
  }


  verMateriaCarreraId(programa: string, idMateria: string) {
    this.materiasService.getMateria(programa, idMateria)
      .then((materia: Materia[]) => {
        if (materia.length === 0) {
          this.fallo = true;
          this.obtenerM = false;
          console.log('Ingrese una materia valida por favor');
        } else {
          this.obtener = false;
          this.obtenerM = true;
          this.fallo = false;
          this.materia = materia;
        }
      })
      .catch(error => console.log(error));
  }

  verMateriasCarrera(programa: string) {
    this.materiasService.getMateriasPrograma(programa)
      .then((materias: Materia[]) => {
        if (materias.length === 0) {
          this.fallo = true;
          this.obtener = false;
          console.log('Ingrese una carrera valida por favor');
        } else {
          this.obtener = true;
          this.fallo = false;
          this.materia = materias;
        }

      }
      )
      .catch(error => console.log(error));
  }

  todasMaterias() {
    this.materiasService.getMaterias()
      .then((materias: any[]) => {
        this.obtener = true;
        this.materia = materias.slice(4);
      })
      .catch((error) => console.log(error));
  }



}
