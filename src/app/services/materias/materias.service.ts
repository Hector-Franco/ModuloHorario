import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {


  constructor(private http: HttpClient) {
    console.log('Servicio de Materias listo');
  }

  // !Obtener Materias del Servicio
  getMaterias() {
  }
}
