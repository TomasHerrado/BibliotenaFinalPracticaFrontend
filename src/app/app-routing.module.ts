import { Routes } from '@angular/router';
import { LibroListComponent } from './libro-list/libro-list.component';
import { LibroFormComponent } from './libro-form/libro-form.component';
import { AlquilerListComponent } from './alquiler-list/alquiler-list.component';
import { InformeSemanalComponent } from './informe-semanal/informe-semanal.component';
import { AlquilerFormComponent } from './alquiler-form/alquiler-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'libros', pathMatch: 'full' },
  { 
    path: 'libros', 
    children: [
      { path: '', component: LibroListComponent, title: 'Libros' },
      { path: 'nuevo', component: LibroFormComponent, title: 'Nuevo Libro' },
      { path: 'editar/:id', component: LibroFormComponent, title: 'Editar Libro' }
    ]
  },
  { 
    path: 'alquileres', 
    children: [
      { path: '', component: AlquilerListComponent, title: 'Alquileres' },
      { path: 'nuevo', component: AlquilerFormComponent, title: 'Nuevo Alquiler' }
    ]
  },
  { 
    path: 'informes', 
    children: [
      { path: 'semanal', component: InformeSemanalComponent, title: 'Informe Semanal' },
      { path: '', redirectTo: 'semanal', pathMatch: 'full' }
    ]
  }
];