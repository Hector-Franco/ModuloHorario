import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/services/materias/materias.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  studentName = 'Héctor Franco';
  fecha = new Date().toString();

  constructor(private materiasService: MateriasService) {
   this.getMaterias();
  }

  ngOnInit() {
  }

  getMaterias() {
    this.materiasService.getMaterias();
  }
}
