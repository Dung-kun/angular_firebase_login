import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegisterComponent,
      },
      {
        path: ':projectId',
        component: RegisterComponent,
      },
    ]),
  ],
  exports: [RegisterComponent],
  providers: []
})
export class RegisterModule { }
