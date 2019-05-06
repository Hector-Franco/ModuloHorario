import { Materia } from './materia.interface';

export interface Docente {
    idDocente: string;
    nombre: string;
    eMail: string;
    materias: Materia[];

/*     agregarMateria(); */
}
