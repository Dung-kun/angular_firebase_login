import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, combineLatest} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { collectionData, collection, doc, setDoc, Firestore } from '@angular/fire/firestore';
import { RegisterValidation } from './validation/register.validation';
import { addDoc  } from 'firebase/firestore';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public formBody: FormGroup;
  public typePassword: string;
  public typeRePassword: string;
  public validation: RegisterValidation;
  public userCollection: any;
  constructor(
    public fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private auth: Auth,
    private fireStore: Firestore
  ) {


     this.userCollection = collection(fireStore, 'user');
    // this.collection = collectionData(cc) as Observable<TaskModel[]>;

    this.formBody = this.scaffoldFormControl();
    this.validation = new RegisterValidation(this);
    this.typePassword = 'password';
    this.typeRePassword = 'password';
  }

  ngOnInit(): void {
  }

  scaffoldFormControl() {
    return this.fb.group({
      email: this.fb.control('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      displayName: this.fb.control('', Validators.required),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25),
      ]),
      rePassword: this.fb.control('', [Validators.required]),
    });
  }

  ngxOnSubmit() {
    if(this.formBody.valid) {
      let raw = this.formBody.getRawValue();
      console.log(raw);
      createUserWithEmailAndPassword(this.auth, raw.email, raw.password).then(
        (response) => {
          console.log(response.user);
          this.addUser(raw.displayName, raw.email);
        }
      ).catch((err) => {
        console.log(err.code);
      });
      console.log(this.auth.currentUser);
    }
  }


  addUser(displayName: string, email: string) {
    let uid =  this.auth.currentUser?.uid || "";
    console.log(uid);
    if(!!uid) {
      setDoc(doc(this.fireStore, "user", uid), {
        "display_name": displayName,
        "email": email
      }).then(res => {
        console.log(res);
      });
    }
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
