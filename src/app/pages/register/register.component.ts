import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, BehaviorSubject, map, of } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import {
  doc,
  setDoc,
  Firestore,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { RegisterValidation } from './validation/register.validation';
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
  public sub: any;
  public projectId: BehaviorSubject<string>;
  public status: BehaviorSubject<number>;
  constructor(
    public fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private auth: Auth,
    private fireStore: Firestore
  ) {
    this.projectId = new BehaviorSubject<string>('');
    this.status = new BehaviorSubject<number>(0);
    this.formBody = this.scaffoldFormControl();
    this.validation = new RegisterValidation(this);
    this.typePassword = 'password';
    this.typeRePassword = 'password';
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ngOnInit(): void {
    const onInit$ = combineLatest([this.appRouteParams()]).pipe(
      map(([params]: any) => {
        if (params['projectId'] != '') {
          let temp: string = params['projectId'] || '';
          return temp;
        }
        return '';
      })
    );

    this.sub = onInit$.subscribe((value) => {
      this.projectId.next(value);
    });
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
    if (this.formBody.valid) {
      let raw = this.formBody.getRawValue();
      console.log(raw);
      this.status.next(1);
      createUserWithEmailAndPassword(this.auth, raw.email, raw.password)
        .then((response) => {
          console.log(response.user.uid);
          this.addUser(response.user.uid, raw.displayName, raw.email);
        })
        .catch((err) => {
          this.status.next(3);
          console.log(err.code);
          if (err.code == 'auth/email-already-in-use') {
            alert('Email này đã được đăng ký, vui lòng nhập Email khác');
          }
        });
    }
  }

  addUser(uid: string, displayName: string, email: string) {
    if (!!uid) {
      setDoc(doc(this.fireStore, 'user', uid), {
        display_name: displayName,
        email: email,
      }).then((_) => {
        if (this.projectId.getValue() != '') {
          const projectIdentify = this.projectId.getValue();
          getDoc(doc(this.fireStore, 'project', projectIdentify)).then(
            (res2) => {
              let temp = res2.get('list_member');
              let arr_member = [];
              if (!!temp){
                let index = temp.findIndex((idx: string) => idx == uid);
                if(index  == -1) arr_member = [...temp, uid];
                else return;
              }
              else arr_member = [uid];
              updateDoc(doc(this.fireStore, 'project', projectIdentify), {
                list_member: arr_member,
              })
                .then((val) => {
                  this.status.next(2);
                  alert(
                    'Bạn đã đăng ký thành công, vui lòng vào ứng dụng để tham gia dự án'
                  );
                })
                .catch((err) => {
                  this.status.next(3);
                });
            }
          );
        } else {
          this.status.next(3);
        }
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
