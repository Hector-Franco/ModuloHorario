import { Routes, RouterModule } from '@angular/router';

import { HorarioComponent } from './components/horario/horario.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
    { path: 'ingreso', component: IngresoComponent },
    { path: 'horario', component: HorarioComponent },
    { path: '**',  component: PageNotFoundComponent } // ?Cualquier otra ruta no registrado
];

export const APP_ROUTING = RouterModule.forRoot(routes);


