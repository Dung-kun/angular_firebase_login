import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [{
  path: '', component: LayoutComponent,
  children: [
    {
      path: 'go-to-project',
      loadChildren: () => import('./../pages/go-to-project/go-to-project.module').then(m => m.GoToModule)
    },
    {
      path: 'register',
      loadChildren: () => import('../pages/register/register.module').then(m=>m.RegisterModule)
    },

    { path: '',   redirectTo: '/register', pathMatch: 'full' },
    { path: '**',   redirectTo: '/register', pathMatch: 'full' }

  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
