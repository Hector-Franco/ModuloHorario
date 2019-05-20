import { Routes, RouterModule } from '@angular/router';

import { HorarioComponent } from './components/horario/horario.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MenuComponent } from './components/menu/menu.component';
import { MateriasComponent } from './components/materias/materias.component';
import { MateriaComponent } from './components/materia/materia.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
    { path: '', component: IngresoComponent },
    { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
    { path: 'horario', component: HorarioComponent, canActivate: [AuthGuard] },
    { path: 'materias', component: MateriasComponent, canActivate: [AuthGuard] },
    { path: 'materia', component: MateriaComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: RegistroComponent },
    { path: '**',  component: PageNotFoundComponent } // ?Cualquier otra ruta no registrado
];

export const APP_ROUTING = RouterModule.forRoot(routes);


