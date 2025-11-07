export interface Libro {
  id?: number;
  isbn: string;
  titulo: string;
  autor: string;
  estado: 'DISPONIBLE' | 'RESERVADO';
}