import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstudiantesPendientesPage } from './estudiantes-pendientes.page';

const routes: Routes = [
  {
    path: '',
    component: EstudiantesPendientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstudiantesPendientesPageRoutingModule {}
