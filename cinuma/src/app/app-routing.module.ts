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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
