import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// !Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HorarioComponent } from './components/horario/horario.component';
import { APP_ROUTING } from './app.routes';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// !Importar el Modulo HttpClientModule
import { IngresoComponent } from './components/ingreso/ingreso.component';

// !Servicios
import { AuthService } from './services/auth/auth.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';


// !Environments
import { environment } from '../environments/environment';
import { MenuComponent } from './components/menu/menu.component';
import { MateriasComponent } from './components/materias/materias.component';
import { RegistroComponent } from './components/registro/registro.component';
import { MateriaComponent } from './components/materia/materia.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HorarioComponent,
    IngresoComponent,
    PageNotFoundComponent,
    MenuComponent,
    MateriasComponent,
    RegistroComponent,
    MateriaComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // ?Cargar FirebaseConfig
  ],
  providers: [
    AuthService,
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
