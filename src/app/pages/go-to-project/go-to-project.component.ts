import { Component, OnDestroy, OnInit } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Params } from '@angular/router';
import { getDoc } from 'firebase/firestore';
import {
  BehaviorSubject,
  Subscription,
  combineLatest,
  of,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-go-to-project',
  templateUrl: './go-to-project.component.html',
  styleUrls: ['./go-to-project.component.scss'],
})
export class GoToProjectComponent implements OnInit, OnDestroy {
  public success: BehaviorSubject<string>;
  public updateDoc: BehaviorSubject<string>;
  public sub: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fstore: Firestore
  ) {
    this.success = new BehaviorSubject<string>('');
    this.updateDoc = new BehaviorSubject<string>('');
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.appRouteParams()]).pipe(
      switchMap(([params]: any) => {
        if (!!params["id"] && !!params["projectId"]) {
          // this.updateDoc.next(params["id"]);
          return this.appAddListMember(params["id"], params["projectId"]);
        }
        return of("vl");
      })
    );

    this.sub = onInit$.subscribe((value) => {
      // console.log(value);
      if (value != "vl" && value != "already") this.success.next('success');
      else if(value == "vl") this.success.next('fail');
      else this.success.next('already');
    });
  }

  appRouteParams() {
    return this.route.params;
  }

  appAddListMember(idUser: string, idProject: string) {
    return getDoc(doc(this.fstore, 'project', idProject)).then((res) => {
      let temp = res.get('list_member');
      let arr_member: string[] = [];
      if (!!temp){
        let index = temp.findIndex((idx: string) => idx == idUser);
        if(index  == -1) arr_member = [...temp, idUser];
        else return "already";
      } else arr_member = [idUser];
      updateDoc(doc(this.fstore, 'project', idProject), {
        list_member: arr_member,
      }).catch(e => {
        return "vl";
      })

      return res;
    }).catch(e => {
      return "vl";
    });
  }
}
