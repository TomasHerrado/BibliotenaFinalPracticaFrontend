import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LibroService } from '../services/libro.service';
import { AlquilerService } from '../services/alquiler.service';
import { Libro } from '../models/libro.model';

@Component({
  selector: 'app-alquiler-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './alquiler-form.component.html',
  styleUrl: './alquiler-form.component.css'
})
export class AlquilerFormComponent implements OnInit{
  alquilerForm: FormGroup;
  librosDisponibles: Libro[] = [];
  librosSeleccionados: Libro[] = [];
  loading = false;
  searchTerm = '';

  constructor(
    private fb: FormBuilder,
    private libroService: LibroService,
    private alquilerService: AlquilerService,
    private router: Router
  ) {
    this.alquilerForm = this.fb.group({
      isbns: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.loadLibrosDisponibles();
  }

  loadLibrosDisponibles(): void {
    this.loading = true;
    this.libroService.getLibros().subscribe({
      next: (libros) => {
        this.librosDisponibles = libros.filter(l => l.estado === 'DISPONIBLE');
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading libros', err);
        this.loading = false;
      }
    });
  }

  get isbnsArray(): FormArray {
    return this.alquilerForm.get('isbns') as FormArray;
  }

  get filteredLibros(): Libro[] {
    if (!this.searchTerm) {
      return this.librosDisponibles.filter(
        libro => !this.librosSeleccionados.find(l => l.id === libro.id)
      );
    }
    
    return this.librosDisponibles.filter(libro => 
      !this.librosSeleccionados.find(l => l.id === libro.id) &&
      (libro.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       libro.autor.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       libro.isbn.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  toggleLibro(libro: Libro): void {
    const index = this.librosSeleccionados.findIndex(l => l.id === libro.id);
    
    if (index > -1) {
      this.librosSeleccionados.splice(index, 1);
      this.isbnsArray.removeAt(index);
    } else {
      this.librosSeleccionados.push(libro);
      this.isbnsArray.push(this.fb.control(libro.isbn));
    }
  }

  isSelected(libro: Libro): boolean {
    return this.librosSeleccionados.some(l => l.id === libro.id);
  }

  removeLibro(libro: Libro): void {
    this.toggleLibro(libro);
  }

  onSubmit(): void {
    if (this.alquilerForm.valid && this.librosSeleccionados.length > 0) {
      this.loading = true;
      const isbns = this.isbnsArray.value;

      this.alquilerService.createAlquiler(isbns).subscribe({
        next: () => {
          this.router.navigate(['/alquileres']);
        },
        error: (err) => {
          console.error('Error creating alquiler', err);
          alert(err.error?.message || 'Error al crear el alquiler. Uno o más libros pueden no estar disponibles.');
          this.loading = false;
        }
      });
    }
  }
}
