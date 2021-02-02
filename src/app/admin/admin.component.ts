import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';

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
    private authService: MsalService  ) { }

  public ngOnInit() {
    this.loading = false;
    this.success = '';
    this.form = this.adminService.createForm();
    this.groups$ = this.adminService.getGroups();
  }

  public sync() {
    if (this.form.valid && this.authService.instance.getAllAccounts().length > 0) {
      this.loading = true;
      const account = this.authService.instance.getAllAccounts()[0];
      this.adminService.syncGroup(this.form.value.userGroupId, account.tenantId).subscribe(
        () => {
          this.loading = false;
          this.success = 'Groups have been synchronized'
        }
      );
    }
  }

}
