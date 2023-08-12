import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotasEstudiantePage } from './notas-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: NotasEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotasEstudiantePageRoutingModule {}
