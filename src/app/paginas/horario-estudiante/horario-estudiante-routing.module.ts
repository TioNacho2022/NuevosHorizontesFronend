import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HorarioEstudiantePage } from './horario-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: HorarioEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorarioEstudiantePageRoutingModule {}
