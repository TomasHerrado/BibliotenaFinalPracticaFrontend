import { Component, NgModule, OnInit } from '@angular/core';
import { Registro } from '../models/alquiler.model';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import { InformeService } from '../services/informe.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-informe-semanal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './informe-semanal.component.html',
  styleUrl: './informe-semanal.component.css'
})
export class InformeSemanalComponent implements OnInit{
informeForm: FormGroup;
  registros: Registro[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private informeService: InformeService
  ) {
    this.informeForm = this.fb.group({
      fechaInicio: [''],
      nombreCliente: [''], 
      isbn: ['']
    });
  }

  ngOnInit(): void {
    const today = new Date();
    const defaultDate = new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0];
    this.informeForm.patchValue({ fechaInicio: defaultDate });
    this.generarInforme();
  }

  generarInforme(): void {
    this.loading = true;
    const { fechaInicio, nombreCliente, isbn } = this.informeForm.value;
    
    if (nombreCliente || isbn) {
      this.informeService.getInformeSemanalFiltrado(fechaInicio, nombreCliente, isbn).subscribe({
        next: (registros) => {
          this.registros = registros;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error generando informe', err);
          this.loading = false;
        }
      });
    } else {
      this.informeService.getInformeSemanal(fechaInicio).subscribe({
        next: (registros) => {
          this.registros = registros;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error generando informe', err);
          this.loading = false;
        }
      });
    }
  }
}
