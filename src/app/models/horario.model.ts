import { Materia } from './materia.model';

export class Horario {

    private fechaCreacion: Date;
    private semestre: number;
    private programa: string;
    private materias: Materia[];

    constructor(materias: Materia[]) {
        this.fechaCreacion = new Date();
        this.materias = materias;
    }

    public consultarMateria() {}
    public informarHorario() {}
    public informarCreditos() {}
    public exportarHorario() {}

}
