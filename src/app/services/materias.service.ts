import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Materia } from '../models/materia.model';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  materias: Materia[] = [];


  constructor(private http: HttpClient) {
    console.log('Servicio de Materias listo');
  }

  // !Obtener Materias del Servicio
  getMaterias() {
    return this.http.get(this.materias + '');
  }
}
