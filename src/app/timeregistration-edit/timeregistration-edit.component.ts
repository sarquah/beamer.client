import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { TimeregistrationService } from './../services/timeregistration.service';
import { ActivatedRoute } from '@angular/router';
import { ITimeregistration } from './../models/interfaces/ITimeregistration';
import { UserService } from './../services/user.service';
import { IUser } from '../models/interfaces/IUser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-timeregistration-edit',
  templateUrl: './timeregistration-edit.component.html',
  styleUrls: ['./timeregistration-edit.component.scss'],
})
export class TimeregistrationEditComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public timeregistration$: Observable<ITimeregistration>;
  public users$: Observable<IUser[]>;
  private id: number;
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
    const id = this.route.snapshot.paramMap.get('timeregistrationId')
    if (id) {
      this.id = parseInt(id, 10);
    }
    this.timeregistration$ = this.timeregistrationService.getTimeregistration(this.id);
    this.users$ = this.userService.getUsers();
    this.subscriptions.push(
      this.timeregistration$.subscribe((x) => this.form.patchValue(x)),
      this.users$.subscribe()
    );
  }

  public ngOnDestroy() {
    this.subscriptions.map((x) => {
      if (x) {
        x.unsubscribe();
      }
    });
  }

  public updateTimeregistration() {
    if (this.form.valid) {
      const timeregistration: ITimeregistration = this.form.value;
      timeregistration.id = this.id;
      this.subscriptions.push(
        this.timeregistrationService
          .updateTimeregistration(this.id, timeregistration)
          .subscribe(() => {
            this.goBack()
          })
      );
    }
  }

  public goBack() {
    this.location.back();
  }
}
