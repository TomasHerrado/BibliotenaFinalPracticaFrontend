import { Component, NgModule, OnInit } from '@angular/core';
import { Libro } from '../models/libro.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibroService } from '../services/libro.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-libro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './libro-form.component.html',
  styleUrl: './libro-form.component.css'
})
export class LibroFormComponent implements OnInit{
libroForm: FormGroup;
  isEdit = false;
  libroId?: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private libroService: LibroService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.libroForm = this.fb.group({
      isbn: ['', [Validators.required, Validators.minLength(10)]],
      titulo: ['', Validators.required],
      autor: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.libroId = +params['id'];
        this.loadLibro();
      }
    });
  }

  loadLibro(): void {
    if (this.libroId) {
      this.loading = true;
      this.libroService.getLibros().subscribe(libros => {
        const libro = libros.find(l => l.id === this.libroId);
        if (libro) {
          this.libroForm.patchValue(libro);
        }
        this.loading = false;
      });
    }
  }

  onSubmit(): void {
    if (this.libroForm.valid) {
      this.loading = true;
      const libro: Libro = {
        ...this.libroForm.value,
        estado: 'DISPONIBLE'
      };

      if (this.isEdit && this.libroId) {
        libro.id = this.libroId;
        this.libroService.updateLibro(libro).subscribe({
          next: () => {
            this.router.navigate(['/libros']);
          },
          error: (err) => {
            console.error('Error updating libro', err);
            this.loading = false;
          }
        });
      } else {
        this.libroService.createLibro(libro).subscribe({
          next: () => {
            this.router.navigate(['/libros']);
          },
          error: (err) => {
            console.error('Error creating libro', err);
            this.loading = false;
          }
        });
      }
    }
  }
}
