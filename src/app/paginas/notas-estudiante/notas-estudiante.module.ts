import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotasEstudiantePageRoutingModule } from './notas-estudiante-routing.module';

import { NotasEstudiantePage } from './notas-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotasEstudiantePageRoutingModule
  ],
  declarations: [NotasEstudiantePage]
})
export class NotasEstudiantePageModule {}
