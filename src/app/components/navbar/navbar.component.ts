import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Estudiante } from 'src/app/models/estudiante.interface';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isLogin: boolean;
  private nombreEstudiante = '';
  private emailEstudiante: string;
  private idEstudiante: string;

   constructor(private authService: AuthService,
    private router: Router,
    private afd: AngularFireDatabase,
    private http: HttpClient) { }

  // ?Inicializa cuando termina de renderizar el modulo  */
  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true;
        this.nombreEstudiante = auth.displayName;

        this.http.get(`https://modulo-horario.firebaseio.com/estudiantes/${auth.uid}.json`)
          .subscribe((data: Estudiante) => console.log('Datos: ' + data.programa + '|' + data.semestre));



      } else {
        this.isLogin = false;
      }
    });
  }

  // !Cerrar Sesión
  onSignOut() {
    this.authService.logOut()
      .then((respuesta) => this.router.navigate(['/']))
      .catch((error) => console.log(error));
  }

}
