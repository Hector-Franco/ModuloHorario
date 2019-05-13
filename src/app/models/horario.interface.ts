import { Materia } from './materia.interface';
import { Docente } from './docente.interface';

export interface Horario {
    ID: string;
    dia: string;
    horaInicio: Date;
    horaFin: Date;
    idMateria: Materia['ID'];
    idProfesor: Docente['ID'];
}
