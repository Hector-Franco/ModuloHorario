import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin: boolean;
  nombre: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  // ?Inicializa cuando termina de renderizar el modulo  */
  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true;
        if (auth.displayName) {
          this.nombre = auth.displayName;
        } else {
          this.nombre = auth.email;
        }
      } else {
        this.isLogin = false;
      }
    });
  }

  // !Cerrar Sesión
  onSignOut() {
    this.authService.logOut()
      .then(() => this.router.navigate(['/']))
      .catch((error) => console.log(error));
  }

}
