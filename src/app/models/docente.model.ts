import { Materia } from './materia.model';

export class Docente {
    private idDocente: string;
    private nombre: string;
    private eMail: string;
    private materias: Materia[];

    constructor(idDocente: string,
                nombre: string,
                eMail: string,
                materias: Materia[]) {

        this.idDocente = idDocente;
        this.nombre = nombre;
        this.eMail = eMail;
        this.materias = materias;
    }

    public agregarMateria(): void {}
}
