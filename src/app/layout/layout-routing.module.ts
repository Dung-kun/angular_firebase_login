import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [{
  path: '', component: LayoutComponent,
  children: [
    // {
    //   path: 'home',
    //   loadChildren: () => import('./../../pages/home/home.module').then(m => m.HomeModule)
    // },
    {
      path: 'login',
      loadChildren: () => import("../pages/login/login.module").then(m=>m.LoginModule)
    },

    {
      path: 'register',
      loadChildren: () => import('../pages/register/register.module').then(m=>m.RegisterModule)
    },

    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    { path: '**',   redirectTo: '/register', pathMatch: 'full' }

  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }