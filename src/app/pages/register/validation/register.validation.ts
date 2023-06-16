import { RegisterComponent } from '../register.component';
export class RegisterValidation {
  input: any;
  constructor(public registerComponent: RegisterComponent) {
    this.input = {
      isEmail: 'email',
      isPassword: 'password',
      isRePassword: 'rePassword',
      isDisplayName: 'displayName'
    };
  }

  get isEmail() {
    return this.registerComponent.formBody.get(this.input.isEmail);
  }

  get isEmailInvalid() {
    return this.isEmail?.invalid && (this.isEmail.dirty || this.isEmail.touched);
  }

  get isEmailValid() {
    return this.isEmail?.valid && (this.isEmail.dirty || this.isEmail.touched);
  }

  get isDisplayName() {
    return this.registerComponent.formBody.get(this.input.isDisplayName);
  }

  get isDisplayNameInvalid() {
    return this.isDisplayName?.invalid && (this.isDisplayName.dirty || this.isDisplayName.touched);
  }

  get isDisplayNameValid() {
    return this.isDisplayName?.valid && (this.isDisplayName.dirty || this.isDisplayName.touched);
  }

  get isPassword() {
    return this.registerComponent.formBody.get(this.input.isPassword);
  }

  get isPasswordInvalid() {
    return (
      this.isPassword?.invalid &&
      (this.isPassword.dirty || this.isPassword.touched)
    );
  }

  get isPasswordValid() {
    return (
      this.isPassword?.valid &&
      (this.isPassword.dirty || this.isPassword.touched)
    );
  }

  get isRePassword() {
    return this.registerComponent.formBody.get(this.input.isRePassword);
  }

  get isRePasswordInvalid() {
    return (
      (this.isRePassword?.invalid || this.isRePassword?.value != this.isPassword?.value) &&
      (this.isRePassword?.dirty || this.isRePassword?.touched)
    );
  }

  get isRePasswordValid() {
    return (
      this.isRePassword?.valid &&
      (this.isRePassword.dirty || this.isRePassword.touched) &&
      this.isRePassword.value == this.isPassword?.value
    );
  }



  get submitInvalid() {
    return this.isRePasswordInvalid || this.registerComponent.formBody.invalid;
  }
}
