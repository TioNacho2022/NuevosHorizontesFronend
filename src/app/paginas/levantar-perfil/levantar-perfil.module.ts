import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LevantarPerfilPageRoutingModule } from './levantar-perfil-routing.module';

import { LevantarPerfilPage } from './levantar-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LevantarPerfilPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LevantarPerfilPage]
})
export class LevantarPerfilPageModule {}
