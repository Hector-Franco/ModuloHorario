import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  private estudiante: Estudiante = {
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
  onSubmitRegister() {
    this.authService.registrarEstudiante(this.estudiante)
      .then((respuesta) => this.router.navigate(['/menu']))
      .catch((error) => {
        console.log(error);
        this.router.navigate(['']);
      });
  }

}
