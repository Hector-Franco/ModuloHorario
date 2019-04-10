import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  mensaje: boolean;
  dias: string[] = ['HORA', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];

  materias = [
    {
      hora: '06:00 - 08:00',
      lunes: '',
      martes: '',
      miercoles: '',
      jueves: '',
      viernes: '',
      sabado: ''
    },
    {
      hora: '08:00 - 10:00',
      lunes: '',
      martes: '',
      miercoles: '',
      jueves: '',
      viernes: '',
      sabado: ''
    },
    {
      hora: '10:00 - 12:00',
      lunes: '',
      martes: '',
      miercoles: '',
      jueves: '',
      viernes: '',
      sabado: ''
    },
    {
      hora: '12:00 - 14:00',
      lunes: '',
      martes: '',
      miercoles: '',
      jueves: '',
      viernes: '',
      sabado: ''
    },
    {
      hora: '14:00 - 16:00',
      lunes: '',
      martes: 'Ética y ciudadania',
      miercoles: 'Ping Pong',
      jueves: '',
      viernes: '',
      sabado: ''
    },
    {
      hora: '16:00 - 18:00',
      lunes: 'G. de Organizaciones',
      martes: '',
      miercoles: '',
      jueves: 'G. de Organizaciones',
      viernes: '',
      sabado: ''
    },
    {
      hora: '18:00 - 20:00',
      lunes: 'Calidad de Software',
      martes: 'Simulación Digital',
      miercoles: 'Calidad de Software ',
      jueves: 'Simulación Digital',
      viernes: '',
      sabado: ''
    },
    {
      hora: '20:00 - 22:00',
      lunes: '',
      martes: '',
      miercoles: '',
      jueves: '',
      viernes: '',
      sabado: ''
    }
  ];


  btnMaterias = [
    {
      grupo: 'Eje Fundamental',
      materia1: 'Cálculo I',
      materia2: 'Cálculo II',
      materia3: 'Cálculo III',
      materia4: 'Física I',
      materia5: 'Física II',
      materia6: 'Física III'
    },
    {
      grupo: 'Electiva Institucional',
      materia1: 'Tenis de mesa',
      materia2: 'Origami',
      materia3: 'Yoga',
      materia4: 'Cero estres',
      materia5: 'Liderazgo',
      materia6: ''
    },
    {
      grupo: 'Electiva de Profundización',
      materia1: 'Gestión de Proyectos',
      materia2: 'Gestión de Organizaciones',
      materia3: 'Gestión de Servicios',
      materia4: 'Formulación y evaluacion de proyectos',
      materia5: '',
      materia6: ''
    },
    {
      grupo: 'Programación',
      materia1: 'Algoritmia I',
      materia2: 'Algoritmia II',
      materia3: 'Algoritmia III',
      materia4: 'Ciencias de la computación I',
      materia5: '',
      materia6: ''
    },
  ];

  numero: number = this.btnMaterias.length;

  constructor() {
    this.mensaje = false;
  }

  ngOnInit() {
  }

  generarHorario() {
    this.mensaje = true;
  }


}
