import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-register',
    pathMatch: 'full'
  },
  {
    path: 'user-register',
    loadChildren: () => import('./pages/users/user-register/user-register.module').then( m => m.UserRegisterPageModule)
  },
  {
    path: 'lista-personal',
    loadChildren: () => import('./pages/lists/lista-personal/lista-personal.module').then(m => m.ListaPersonalPageModule)
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
  },
  {
    path: 'lista-personal-agregar',
    loadChildren: () => import('./pages/lists/lista-personal-agregar/lista-personal-agregar.module').then( m => m.ListaPersonalAgregarPageModule)
  },
  {
    path: 'lista-personal-elemento-detalles',
    loadChildren: () => import('./pages/lists/lista-personal-elemento-detalles/lista-personal-elemento-detalles.module').then( m => m.ListaPersonalElementoDetallesPageModule)
  },
  {
    path: 'lista-listado',
    loadChildren: () => import('./pages/lists/lista-listado/lista-listado.module').then( m => m.ListaListadoPageModule)
  },
  {
    path: 'lista-detalles',
    loadChildren: () => import('./pages/lists/lista-detalles/lista-detalles.module').then( m => m.ListaDetallesPageModule)
  },
  {
    path: 'lista-crear',
    loadChildren: () => import('./pages/lists/lista-crear/lista-crear.module').then( m => m.ListaCrearPageModule)
  },
  {
    path: 'grupo-listado',
    loadChildren: () => import('./pages/grupos/grupo-listado/grupo-listado.module').then( m => m.GrupoListadoPageModule)
  },
  {
    path: 'grupo-crear',
    loadChildren: () => import('./pages/grupos/grupo-crear/grupo-crear.module').then( m => m.GrupoCrearPageModule)
  },
  {
    path: 'grupo-detalles',
    loadChildren: () => import('./pages/grupos/grupo-detalles/grupo-detalles.module').then( m => m.GrupoDetallesPageModule)
  },
  {
    path: 'articulo-listado',
    loadChildren: () => import('./pages/foro/articulo-listado/articulo-listado.module').then( m => m.ArticuloListadoPageModule)
  },
  {
    path: 'articulo-detalles',
    loadChildren: () => import('./pages/foro/articulo-detalles/articulo-detalles.module').then( m => m.ArticuloDetallesPageModule)
  },
  {
    path: 'mensaje-listado',
    loadChildren: () => import('./pages/mensajes/mensaje-listado/mensaje-listado.module').then( m => m.MensajeListadoPageModule)
  },
  {
    path: 'articulo-crear',
    loadChildren: () => import('./pages/foro/articulo-crear/articulo-crear.module').then( m => m.ArticuloCrearPageModule)
  },
  {
    path: 'user-admin-listado-usuarios',
    loadChildren: () => import('./pages/users/user-admin-listado-usuarios/user-admin-listado-usuarios.module').then( m => m.UserAdminListadoUsuariosPageModule)
  },
  {
    path: 'user-admin-crear-avanzado',
    loadChildren: () => import('./pages/users/user-admin-crear-avanzado/user-admin-crear-avanzado.module').then( m => m.UserAdminCrearAvanzadoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
