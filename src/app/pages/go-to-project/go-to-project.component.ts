import { Component, OnDestroy, OnInit } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Subscription, combineLatest, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-go-to-project',
  templateUrl: './go-to-project.component.html',
  styleUrls: ['./go-to-project.component.scss']
})
export class GoToProjectComponent implements OnInit, OnDestroy {

  public success: BehaviorSubject<string>;
  public sub: Subscription | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fstore: Firestore
  ) {
    this.success = new BehaviorSubject<string>("");
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    const onInit$ = combineLatest([this.appRouteParams()]).pipe(
      switchMap(([params]) => {
        if (!!params["id"] && !!params["taskId"]) {
          console.log(params["id"], "cccccccccaaaaaaa");
          console.log(params["taskId"], "vcl luon");
        } else console.log("vlol luon");
        return of(params);
      })
    );

    this.sub = onInit$.subscribe((value) => {
      console.log("value", value);
      this.success.next("success");
    });
  }

  appRouteParams() {
    return this.route.params;
  }


  appAddListMember(idUser: string, idTask : string) {
    return updateDoc(doc(this.fstore, "task", idTask), {
      "list_member": idUser
    });
  }
}
