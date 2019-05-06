import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private authService: AuthService) {

  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
                return this.afAuth.authState
                .pipe(take(1))
                .pipe(map(authState => !!authState))
                .pipe(tap(auth => {
                  if (!auth) {
                    console.log('Estudiante no Loggeado. Devuelta a Login');
                    this.router.navigate(['']);
                  }
                }));
  }


}
