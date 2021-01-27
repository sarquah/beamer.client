import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { IUser } from '../models/interfaces/IUser';
import { AdminService } from '../services/admin.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public form: FormGroup;
  public groups$: Observable<any>;
  public loading: boolean;
  public success: string;

  constructor(
    private adminService: AdminService,
    private authService: MsalService,
    private userService: UserService
  ) { }

  public ngOnInit() {
    this.loading = false;
    this.success = '';
    this.form = this.adminService.createForm();
    this.groups$ = this.adminService.getGroups();
  }

  public sync() {
    if (this.form.valid) {
      this.loading = true;
      const account = this.authService.instance.getAllAccounts().pop();
      this.adminService.getGroupMembers(this.form.value.userGroupId).pipe(
        switchMap(groupMembers => {
          const users: IUser[] = groupMembers.value.map(member => {
            return {
              name: member.displayName,
              department: '',
              role: member.jobTitle,
              tenantId: account.tenantId,
              email: member.mail
            }
          });
          return this.userService.createUsers(users)
        }),
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      ).subscribe(
        () => {
          this.loading = false;
          this.success = 'Groups have been synchronized'
        }
      );
    }
  }

}
