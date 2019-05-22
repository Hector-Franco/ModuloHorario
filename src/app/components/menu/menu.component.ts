import { Component, OnInit } from '@angular/core';
import { MateriasService } from 'src/app/services/materias/materias.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  fecha: any;

  constructor(private materiasService: MateriasService,
              private authService: AuthService,
              private router: Router) {
    this.fecha = authService.getFechaLogin();
  }

  ngOnInit() {
  }

  verHorario() {
    this.router.navigate(['/horario']);
  }

  verMaterias() {
    this.router.navigate(['/materias']);
  }

  agregarMateria() {
    this.router.navigate(['/materia']);
  }
}
