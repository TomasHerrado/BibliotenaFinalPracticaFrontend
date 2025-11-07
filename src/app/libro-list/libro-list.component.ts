import { Component, OnInit } from '@angular/core';
import { LibroService } from '../services/libro.service';
import { Libro } from '../models/libro.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-libro-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule ],
  templateUrl: './libro-list.component.html',
  styleUrl: './libro-list.component.css'
})
export class LibroListComponent implements OnInit{
  libros: Libro[] = [];
  loading = true;

  constructor(private libroService: LibroService) { }

  ngOnInit(): void {
    this.loadLibros();
  }

  loadLibros(): void {
    this.loading = true;
    this.libroService.getLibros().subscribe({
      next: (libros) => {
        this.libros = libros;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading libros', err);
        this.loading = false;
      }
    });
  }

  deleteLibro(id: number): void {
    if (confirm('¿Está seguro de eliminar este libro?')) {
      this.libroService.deleteLibro(id).subscribe({
        next: () => {
          this.loadLibros();
        },
        error: (err) => {
          console.error('Error deleting libro', err);
        }
      });
    }
  }

}
