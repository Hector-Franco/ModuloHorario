import { Docente } from './docente.interface';

export interface Materia {

    idMateria: string;
    nombre: string;
    creditos: number;
    lugar?: string;
    disponibilidad?: boolean;
    dia?: Date;
    hora?: Date;
    periodo?: string;
    docente?: Docente;
    cupo?: 25;
}
