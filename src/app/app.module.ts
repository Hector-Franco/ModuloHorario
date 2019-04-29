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
import { HttpClientModule} from '@angular/common/http';
import { IngresoComponent } from './components/ingreso/ingreso.component';

// !Servicios
import { AuthService } from './services/auth/auth.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';

// !Environments
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HorarioComponent,
    IngresoComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    HttpClientModule, // ?Cargar el Modulo en los import
    AngularFireModule.initializeApp(environment.firebaseConfig), // ?Cargar FirebaseConfig
  ],
  providers: [
    AuthService,
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
