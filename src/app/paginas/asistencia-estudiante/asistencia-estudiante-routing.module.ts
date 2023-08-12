import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciaEstudiantePage } from './asistencia-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciaEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciaEstudiantePageRoutingModule {}
