import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registro } from '../models/alquiler.model';
import { Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class AlquilerService {
  private apiUrl = 'http://localhost:8080/api/biblioteca';

  constructor(private http: HttpClient) { }

  getAlquileres(): Observable<Registro[]> {
    return this.http.get<Registro[]>(`${this.apiUrl}/alquilar`);
  }

  createAlquiler(isbns: string[]): Observable<Registro> {
    return this.http.post<Registro>(`${this.apiUrl}/alquilar`, isbns);
  }

  devolverLibros(registroId: number): Observable<Registro> {
    return this.http.post<Registro>(`${this.apiUrl}/devolver/${registroId}`, {});
  }

  filterAlquileres(nombreCliente?: string, fechaInicio?: string, fechaFin?: string, isbn?: string): Observable<Registro[]> {
    let params: any = {};
    if (nombreCliente) params.nombreCliente = nombreCliente;
    if (fechaInicio) params.fechaInicio = fechaInicio;
    if (fechaFin) params.fechaFin = fechaFin;
    if (isbn) params.isbn = isbn;
    
    return this.http.get<Registro[]>(`${this.apiUrl}/alquilar/filtrado`, { params });
  }
}