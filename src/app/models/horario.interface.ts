import { Materia } from './materia.interface';

export interface Horario {

    fechaCreacion: Date;
    semestre: number;
    programa: string;
    materias: Materia[];
}
