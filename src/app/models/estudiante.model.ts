export class Estudiante {
    private idEstudiante: string;
    private nombre: string;
    private eMail: string;
    private password: string;
    private programa: string;
    private semestre: number;
    private numCreditosCursados: number;

    constructor(idEstudiante: string,
                nombre: string,
                eMail: string,
                password: string,
                programa: string) {

        this.idEstudiante = idEstudiante;
        this.nombre = nombre;
        this.eMail = eMail;
        this.password = password;
        this.programa = programa;
        this.semestre = 2;
        this.numCreditosCursados = 16;
    }

    public buscarMateria(): void {}
    public agregarMateria(): void {}
    public eliminarMateria(): void {}
    public aceptarHorario(): void {}

}
