import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  email: string;
  password: string;
  valido: boolean;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  // !Ingresar al Modulo
  onSubmitLogin() {
    this.authService.LoginDocente(this.email, this.password)
      .then(() => this.router.navigate(['/menu']))
      .catch((error) => {
        this.valido = true;
        console.log(this.valido);
        console.log(error);
      });
  }

}
