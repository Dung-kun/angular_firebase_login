import { NgModule } from "@angular/core";
import { GoToProjectComponent } from "./go-to-project.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [GoToProjectComponent],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      RouterModule.forChild([
        {
          path: '',
          component: GoToProjectComponent,
        },
        {
            path: ':id/:taskId',
            component: GoToProjectComponent,
        }
      ]),
    ],
    providers: [],
    exports: [GoToProjectComponent]
  })
  export class GoToModule { }