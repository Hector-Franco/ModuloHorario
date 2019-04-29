import { Routes, RouterModule } from '@angular/router';

import { HorarioComponent } from './components/horario/horario.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';


const routes: Routes = [
    { path: 'ingreso', component: IngresoComponent },
    { path: 'horario/:id', component: HorarioComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'ingreso' }
];

export const APP_ROUTING = RouterModule.forRoot(routes);
