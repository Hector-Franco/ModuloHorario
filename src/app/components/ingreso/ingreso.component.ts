import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Estudiante } from 'src/app/models/estudiante.interface';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  email: string;
  password: string;
  valido: boolean;

  estudiante: Estudiante = {
    idEstudiante: '',
    nombre: '',
    eMail: '',
    password: '',
    programa: '',
    semestre: '',
    numCreditosCursados: 0
  };

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  // !Ingresar al Modulo
  onSubmitLogin() {
    this.authService.LoginEstudiante(this.estudiante)
      .then(() => this.router.navigate(['/menu']))
      .catch((error) => {
        this.valido = true;
        console.log(error);
      });
  }

}
