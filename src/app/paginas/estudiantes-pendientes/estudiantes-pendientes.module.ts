import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstudiantesPendientesPageRoutingModule } from './estudiantes-pendientes-routing.module';

import { EstudiantesPendientesPage } from './estudiantes-pendientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstudiantesPendientesPageRoutingModule
  ],
  declarations: [EstudiantesPendientesPage]
})
export class EstudiantesPendientesPageModule {}
