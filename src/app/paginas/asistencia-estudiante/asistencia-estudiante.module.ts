import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciaEstudiantePageRoutingModule } from './asistencia-estudiante-routing.module';

import { AsistenciaEstudiantePage } from './asistencia-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaEstudiantePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AsistenciaEstudiantePage]
})
export class AsistenciaEstudiantePageModule {}
