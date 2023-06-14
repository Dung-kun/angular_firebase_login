import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { combineLatest, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent
 implements OnInit
{
  public typePassword: string;
  public formGroup: FormGroup;

  private userId: String = "";
  constructor(
    private fb: FormBuilder,
    private readonly route: ActivatedRoute,
    public router: Router
  ) {

    this.typePassword = 'password';

    this.formGroup = this.fb.group({
      email: new FormControl(""),
      password: new FormControl(""),
      rePassword: new FormControl("")
    });
  }

  ngOnInit(): void {

    this.scaffoldFormControl();
    const onInit$ = combineLatest([this.appRouteParams()]).pipe(
      map(value => {
        return value;
      }),
    );
    
    const onInit = onInit$.subscribe((value) => {
      this.userId = value.toString();
    });


  }

  ngxOnSubmit(): void {


  }
  prepareFormBodyControls() {
  }

  scaffoldFormControl() {
    this.formGroup = this.fb.group({
      email: new FormControl(""),
      password: new FormControl(""),
      rePassword: new FormControl("")
    });
  }


  appRouteParams() {
    return this.route.params;
  }

  changeTypePassword() {
    switch (this.typePassword) {
      case 'password':
        this.typePassword = 'text';
        break;
      case 'text':
        this.typePassword = 'password';
        break;
      default:
        this.typePassword = 'password';
        break;
    }
  }
}

