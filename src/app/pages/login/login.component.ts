import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Firestore, collectionData, collection, doc } from '@angular/fire/firestore';
interface TaskModel {
  list_member: String[],
  description: String,
  id_project: String
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent
 implements OnInit, OnDestroy
{
  public typePassword: string;
  public formGroup: FormGroup;
  public sub: any;
  public collection: Observable<TaskModel[]>;
  private userId$: BehaviorSubject<String>;
  constructor(
    private fb: FormBuilder,
    private readonly route: ActivatedRoute,
    public router: Router,
    private fireStore: Firestore
  ) {

    const cc = collection(fireStore, 'user');
    this.collection = collectionData(cc) as Observable<TaskModel[]>;

    console.log(this.collection);
    this.typePassword = 'password';
    this.userId$ = new BehaviorSubject<String>("");
    this.formGroup = this.fb.group({
      email: new FormControl(""),
      password: new FormControl(""),
      rePassword: new FormControl("")
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {


    this.scaffoldFormControl();

    this.collection.subscribe((value) => {
      console.log(value);
    });
    // const onInit$ = combineLatest([this.appRouteParams()]).pipe(
    //   map((value: Params) => {
    //     let userId = value["id"] != null ? value["id"] : "";
    //     return userId;
    //   }),
    // );

    // this.sub = onInit$.subscribe((value) => {
    //   this.userId$.next(value);
    // });


  }


  ngxOnSubmit(): void {


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

