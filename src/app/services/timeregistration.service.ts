import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITimeregistration as ITimeregistration } from '../models/interfaces/ITimeregistration';

type TimeregistrationFormControls = { [field in keyof ITimeregistration]?: FormControl };
@Injectable({
  providedIn: 'root'
})
export class TimeregistrationService {
  private readonly apiUrl = 'api/v1/timeregistration';
  private readonly baseUrl = `${environment.beamerAPIEndpoint}/${this.apiUrl}`;
  private readonly accountInfo: AccountInfo;
  private readonly params: HttpParams;

  constructor(
    private httpClient: HttpClient,
    private authService: MsalService,
    private formBuilder: FormBuilder
  ) {
    if (this.authService.instance.getAllAccounts().length > 0) {
      this.accountInfo = this.authService.instance.getAllAccounts()[0];
      this.params = new HttpParams().set('tenantId', this.accountInfo.tenantId);
    }
  }

  public getTimeregistrationsForTask(taskId: number): Observable<ITimeregistration[]> {
    if (this.accountInfo) {
      const url = `${this.baseUrl}/timeregistrations`;
      const params = this.params.set('taskId', taskId.toString());
      return this.httpClient.get<ITimeregistration[]>(url, { params });
    } else {
      return throwError('Not logged in');
    }
  }

  public getTimeregistration(id: number): Observable<ITimeregistration> {
    if (this.accountInfo) {
      const url = `${this.baseUrl}/${id}`;
      const params = this.params.set('taskId', id.toString());
      return this.httpClient.get<ITimeregistration>(url, { params });
    } else {
      return throwError('Not logged in');
    }
  }

  public updateTimeregistration(id: number, timeregistration: ITimeregistration): Observable<any> {
    if (this.accountInfo) {
      const url = `${this.baseUrl}/${id}`;
      return this.httpClient.put<ITimeregistration>(url, this.addTenantIdToTimeregistration(timeregistration), { params: this.params });
    } else {
      return throwError('Not logged in');
    }
  }

  public deleteTimeregistration(id: number): Observable<any> {
    if (this.accountInfo) {
      const url = `${this.baseUrl}/${id}`;
      return this.httpClient.delete<number>(url);
    } else {
      return throwError('Not logged in');
    }
  }

  public createTimeregistration(timeregistration: ITimeregistration): Observable<ITimeregistration> {
    return this.accountInfo ?
      this.httpClient.post<ITimeregistration>(this.baseUrl, this.addTenantIdToTimeregistration(timeregistration), { params: this.params })
      : throwError('Not logged in');
  }

  public createForm(): FormGroup {
    const formControls: TimeregistrationFormControls = {
      taskId: new FormControl(null),
      ownerId: new FormControl(null),
      date: new FormControl(null),
      hours: new FormControl(null)
    };
    return this.formBuilder.group(formControls);
  }

  private addTenantIdToTimeregistration(timeregistration: ITimeregistration): ITimeregistration {
    return this.accountInfo ? {
      ...timeregistration,
      tenantId: this.accountInfo.tenantId
    } : timeregistration;
  }
}
