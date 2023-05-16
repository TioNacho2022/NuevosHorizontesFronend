import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LevantarPerfilPage } from './levantar-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: LevantarPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LevantarPerfilPageRoutingModule {}
