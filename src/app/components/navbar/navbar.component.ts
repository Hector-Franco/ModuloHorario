import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isLogin: boolean;
  private nombreEstudiante: string;
  private emailEstudiante: string;


  constructor(private authService: AuthService,
              private router: Router) { }

  // ?Inicializa cuando termina de renderizar el modulo  */
  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true;
        this.nombreEstudiante = auth.displayName;
        this.emailEstudiante = auth.email;
      } else {
        this.isLogin = false;
      }
    });
  }

  // !Cerrar Sesión
  onSignOut() {
    this.authService.logOut()
                    .then((respuesta) => this.router.navigate(['/ingreso']))
                    .catch((error) => console.log(error));
  }

}
