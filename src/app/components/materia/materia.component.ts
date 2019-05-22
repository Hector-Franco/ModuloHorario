import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/services/materias/materias.service';
import { Materia } from 'src/app/models/materia.interface';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  exito: boolean;
  error: boolean;

  constructor(private materiasService: MateriasService) { }

  ngOnInit() {

  }

  crearMateria(programa: string,
               idMateria: string,
               nombreMateria: string,
               creditosMateria: string) {

    const materia: Materia = {
      ID: idMateria.toUpperCase(),
      nombre: nombreMateria,
      creditos: parseInt(creditosMateria, 10)
    };
    this.materiasService.crearMateria(programa, materia)
    .then((mat) => {
      console.log('Materia creada con éxito: ' + mat);
      this.exito = true;
      this.error = false;
    })
    .catch((error) => {
      console.log('Materia no creada: ' + error);
      this.error = true;
      this.exito = false;
    });
  }

}
