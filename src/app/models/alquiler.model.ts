import { Libro } from './libro.model';

export interface Registro {
  id?: number;
  clienteId: number;
  nombreCliente: string;
  fechaReserva: Date;
  fechaDevolucion?: Date;
  librosReservados: Libro[];
  total?: number;
}