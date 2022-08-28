import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-register',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'user-register',
    loadChildren: () => import('./pages/users/user-register/user-register.module').then( m => m.UserRegisterPageModule)
  },
  {
    path: 'personal-list',
    loadChildren: () => import('./pages/lists/personal-list/personal-list.module').then( m => m.PersonalListPageModule)
  },
  {
    path: 'pagina-principal',
    loadChildren: () => import('./pages/pagina-principal/pagina-principal.module').then(m => m.PaginaPrincipalPageModule)
  },
  {
    path: 'user-login',
    loadChildren: () => import('./pages/users/user-login/user-login.module').then( m => m.UserLoginPageModule)
  },
  {
    path: 'user-perfil',
    loadChildren: () => import('./pages/users/user-perfil/user-perfil.module').then( m => m.UserPerfilPageModule)
  },
  {
    path: 'elemento-listado',
    loadChildren: () => import('./pages/elementos/elemento-listado/elemento-listado.module').then( m => m.ElementoListadoPageModule)
  },
  {
    path: 'elemento-crear',
    loadChildren: () => import('./pages/elementos/elemento-crear/elemento-crear.module').then( m => m.ElementoCrearPageModule)
  },
  {
    path: 'elemento-detalles',
    loadChildren: () => import('./pages/elementos/elemento-detalles/elemento-detalles.module').then( m => m.ElementoDetallesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
