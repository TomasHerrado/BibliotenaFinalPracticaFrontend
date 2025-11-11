import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registro } from '../models/alquiler.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InformeService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getInformeSemanal(fechaInicio: string): Observable<Registro[]> {
    return this.http.get<Registro[]>(`${this.apiUrl}/informe-semanal`, { 
      params: { fechaInicio } 
    });
  }

  getInformeSemanalFiltrado(fechaInicio: string, nombreCliente?: string, isbn?: string): Observable<Registro[]> {
    let params: any = { fechaInicio };
    if (nombreCliente) params.nombreCliente = nombreCliente;
    if (isbn) params.isbn = isbn;
    
    return this.http.get<Registro[]>(`${this.apiUrl}/informe-semanal/filtrado`, { params });
  }

  getLibrosMasAlquilados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/libros-mas-alquilados`);
  }

  getLibrosMasAlquiladosFiltrado(desde?: string, hasta?: string, autor?: string, top: number = 10): Observable<any[]> {
    let params: any = { top };
    if (desde) params.desde = desde;
    if (hasta) params.hasta = hasta;
    if (autor) params.autor = autor;
    
    return this.http.get<any[]>(`${this.apiUrl}/libros-mas-alquilados/filtrado`, { params });
  }
}