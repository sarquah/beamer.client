import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { TimeregistrationService } from './../services/timeregistration.service';
import { ITimeregistration } from './../models/interfaces/ITimeregistration';
import { UserService } from './../services/user.service';
import { IUser } from '../models/interfaces/IUser';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-timeregistration-create',
  templateUrl: './timeregistration-create.component.html',
  styleUrls: ['./timeregistration-create.component.scss'],
})
export class TimeregistrationCreateComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public users$: Observable<IUser[]>;
  private taskId: number;
  private subscriptions: Subscription[];

  constructor(
    private timeregistrationService: TimeregistrationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  public ngOnInit() {
    this.form = this.timeregistrationService.createForm();
    this.subscriptions = [];
    const taskId = this.route.snapshot.paramMap.get('id')
    if (taskId) {
      this.taskId = parseInt(taskId, 10);
      this.form.controls.taskId.setValue(this.taskId);
    }
    this.users$ = this.userService.getUsers();
    this.subscriptions.push(this.users$.subscribe());
  }

  public ngOnDestroy() {
    this.subscriptions.map((x) => {
      if (x) {
        x.unsubscribe();
      }
    });
  }

  public createTimeregistration() {
    if (this.form.valid) {
      const timeregistration: ITimeregistration = this.form.value;
      this.subscriptions.push(
        this.timeregistrationService.createTimeregistration(timeregistration)
          .subscribe(() => this.goBack())
      );
    }
  }

  public goBack() {
    this.location.back();
  }
}
