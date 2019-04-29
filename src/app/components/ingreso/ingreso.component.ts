import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  private email: string;
  private password: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  // !Ingresar al Modulo
  onSubmitLogin() {
    this.authService.LoginEstudiante(this.email, this.password)
      .then((respuesta) => this.router.navigate(['/horario']))
      .catch((error) => {
        console.log(error);
        this.router.navigate(['/ingreso']);
      });
  }

}
