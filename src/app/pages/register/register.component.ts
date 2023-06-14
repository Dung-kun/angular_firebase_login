import { Component, OnInit } from '@angular/core';
import { RegisterFormViewModel } from './models/register-form-view.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { combineLatest, map, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent
  implements OnInit
{
  public formBody: FormGroup;
  public typePassword: string;
  public typeRePassword: string;
  constructor(
    public fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {

    this.formBody = new FormGroup(null);
    this.typePassword = 'password';
    this.typeRePassword = 'password';
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.appRouteParams()]);

    const onInit = onInit$.subscribe((value) => {
    });

  }

  prepareFormBodyControls(): FormGroup {
    const bodyControl = this.scaffoldFormControl();
    const formBody = this.fb.group(bodyControl);

    return formBody;
  }

  scaffoldFormControl() {
    const registerForm = {
      id: new FormControl(''),
      email: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      fullname: this.fb.control('', [Validators.required]),
      dob: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25),
      ]),
      rePassword: this.fb.control('', [Validators.required]),
    };

    return registerForm;
  }

  ngxOnSubmit() {
    
  }


  appRouteParams() {
    return this.route.params;
  }

  changeTypePassword(value: string, check: boolean) {
    let temp = this.typeRePassword;
    if (check) {
      switch (value) {
        case 'password':
          this.typePassword = 'text';
          break;
        default:
          this.typePassword = 'password';
          break;
      }
    } else {
      switch (value) {
        case 'password':
          this.typeRePassword = 'text';
          break;
        default:
          this.typeRePassword = 'password';
          break;
      }
    }
  }

  checkValuePassword() {}
}