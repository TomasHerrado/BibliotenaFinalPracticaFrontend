import { Component, OnInit } from '@angular/core';
import { Registro } from '../models/alquiler.model';
import { AlquilerService } from '../services/alquiler.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-alquiler-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './alquiler-list.component.html',
  styleUrl: './alquiler-list.component.css'
})
export class AlquilerListComponent implements OnInit{
alquileres: Registro[] = [];
  loading = true;

  constructor(private alquilerService: AlquilerService) { }

  ngOnInit(): void {
    this.loadAlquileres();
  }

  loadAlquileres(): void {
    this.loading = true;
    this.alquilerService.getAlquileres().subscribe({
      next: (alquileres) => {
        this.alquileres = alquileres;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading alquileres', err);
        alert('Error al cargar los alquileres');
        this.loading = false;
      }
    });
  }

  devolverLibros(registroId: number): void {
    if (confirm('¿Confirmar devolución de libros?')) {
      this.loading = true;
      this.alquilerService.devolverLibros(registroId).subscribe({
        next: (registro) => {
          console.log('Devolución exitosa:', registro);
          alert('¡Libros devueltos exitosamente!');
          this.loadAlquileres();
        },
        error: (err) => {
          console.error('Error devolviendo libros', err);
          alert('Error al devolver los libros: ' + (err.error?.message || 'Error desconocido'));
          this.loading = false;
        }
      });
    }
  }
}
