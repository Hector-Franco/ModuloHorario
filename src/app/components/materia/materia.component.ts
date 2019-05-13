import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/services/materias/materias.service';
import { Materia } from 'src/app/models/materia.interface';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  obtener = false;
  materia: Materia[];
  idMateria: string;
  programa: string;
  semestre: string;
  constructor(private materiasService: MateriasService) { }

  ngOnInit() {

    this.programa = this.materiasService.getPrograma();
    switch (this.programa) {
      case '1115': this.programa += ' - Arquitectura'; break;
      case '1413': this.programa += ' - Administración de Empresas'; break;
      case '1715': this.programa += ' - Psicología'; break;
      case '1720': this.programa += ' - Ingeniería de Sistemas'; break;

      default:
        break;
    }
    this.semestre = this.materiasService.getSemestre();
  }

  verMateria() {
    console.log(this.materia);
    this.materiasService.getMateria(this.idMateria)
      .then((materia: Materia[]) => {
        this.obtener = true;
        this.materia = materia;
        console.log(this.materia);
      }
      )
      .catch(
        error => console.log(error)
      );
  }

}
