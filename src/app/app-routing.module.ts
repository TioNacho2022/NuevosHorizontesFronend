import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./paginas/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'levantar-perfil',
    loadChildren: () => import('./paginas/levantar-perfil/levantar-perfil.module').then( m => m.LevantarPerfilPageModule)
  },
  {
    path: 'estudiantes-pendientes',
    loadChildren: () => import('./paginas/estudiantes-pendientes/estudiantes-pendientes.module').then( m => m.EstudiantesPendientesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
