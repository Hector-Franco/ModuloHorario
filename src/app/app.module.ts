import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HorarioComponent } from './components/horario/horario.component';
import { APP_ROUTING } from './app.routes';
import { FormsModule } from '@angular/forms';


// !Importar el Modulo HttpClientModule
import { HttpClientModule} from '@angular/common/http';
import { IngresoComponent } from './components/ingreso/ingreso.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HorarioComponent,
    IngresoComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    HttpClientModule // !Cargar el Modulo en los import
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
