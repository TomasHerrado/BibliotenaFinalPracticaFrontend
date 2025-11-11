import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = `${environment.apiUrl}/libros`;

  constructor(private http: HttpClient) { }

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  createLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  updateLibro(libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(this.apiUrl, libro);
  }

  deleteLibro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  filterLibros(titulo?: string, autor?: string, estado?: string, isbn?: string): Observable<Libro[]> {
    let params: any = {};
    if (titulo) params.titulo = titulo;
    if (autor) params.autor = autor;
    if (estado) params.estado = estado;
    if (isbn) params.isbn = isbn;
    
    return this.http.get<Libro[]>(`${this.apiUrl}/filtrado`, { params });
  }
}