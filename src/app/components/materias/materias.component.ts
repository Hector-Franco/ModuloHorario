import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/services/materias/materias.service';
import { Materia } from 'src/app/models/materia.interface';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  private programa: string;
  private semestre: string;

  materias: Materia [];


  private obtener = false;

  constructor(private materiasService: MateriasService) {
  }

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

  verMaterias() {
    this.materiasService.getMaterias()
    .then( (materias: Materia[]) => {
        this.obtener = true;
        console.log(this.obtener);
        this.materias = materias;
        console.log(this.materias);
      }
    )
    .catch(
      error => console.log(error)
    );
  }
}
