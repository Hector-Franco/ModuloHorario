import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/services/materias/materias.service';
import { Materia } from 'src/app/models/materia.interface';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  programa: string;
  semestre: string;
  materias: Materia [];
  materia: Materia [];
  idMateria: string;
  obtener: boolean;
  fallo: boolean;
  boton: boolean;

  constructor(private materiasService: MateriasService) {
  }

  ngOnInit() {
  }

  verMaterias() {
    this.materiasService.getMaterias(this.programa)
     .then( (materias: Materia[]) => {

        if ( materias.length === 0 ) {
          this.fallo = true;
          this.obtener = false;
          console.log('Ingrese una carrera valida por favor');
        } else {
          this.obtener = true;
          this.fallo = false;
          this.boton = true;
          console.log(this.obtener);
          this.materias = materias;
          console.log(this.materias);
        }

      }
    )
    .catch(
      error => console.log(error)
    );
  }

  verMateria() {
    this.materiasService.getMateria(this.programa, this.idMateria)
     .then( (materia: Materia[]) => {

        if ( materia.length === 0 ) {
          this.fallo = true;
          this.obtener = false;
          console.log('Ingrese una materia valida por favor');
        } else {
          this.obtener = true;
          this.fallo = false;
          console.log(this.obtener);
          this.materia = materia;
          console.log(this.materias);
        }

      }
    )
    .catch(
      error => console.log(error)
    );
  }
}
