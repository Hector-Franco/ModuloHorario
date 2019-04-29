export class Materia {
    static cupo = 25;
    private idMateria: string;
    private nombre: string;
    private numCreditos: number;
    private lugar: string;
    private disponibilidad: boolean;
    private dia: Date;
    private hora: Date;
    private periodo: string;


    constructor(idMateria: string,
                nombre: string,
                numCreditos: number,
                lugar: string) {

        Materia.cupo -= 1;

    }
}
