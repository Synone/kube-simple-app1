import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'login-info',
    loadComponent: () => import('./login/login-info/login-info.component').then(m => m.LoginInfoComponent)
  }
];
