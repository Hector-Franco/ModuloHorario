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

  }

  verMateria() {
    console.log(this.materia);
    this.materiasService.getMateria(this.programa, this.idMateria)
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
