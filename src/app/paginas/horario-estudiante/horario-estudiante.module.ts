import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorarioEstudiantePageRoutingModule } from './horario-estudiante-routing.module';

import { HorarioEstudiantePage } from './horario-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorarioEstudiantePageRoutingModule
  ],
  declarations: [HorarioEstudiantePage]
})
export class HorarioEstudiantePageModule {}
