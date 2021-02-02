import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ITask } from '../models/interfaces/ITask';

type TaskFormControls = { [field in keyof ITask]?: FormControl };
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly apiUrl = 'api/v1/task';
  private readonly baseUrl = `${environment.beamerAPIEndpoint}/${this.apiUrl}`;
  private readonly accountInfo: AccountInfo;
  private readonly params: HttpParams;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private authService: MsalService
  ) {
    if (this.authService.instance.getAllAccounts().length > 0) {
      this.accountInfo = this.authService.instance.getAllAccounts()[0];
      this.params = new HttpParams().set('tenantId', this.accountInfo.tenantId);
    }
  }

  public getTasks(): Observable<ITask[]> {
    if (this.accountInfo) {
      const url = `${this.baseUrl}/tasks`;
      return this.httpClient.get<ITask[]>(url, { params: this.params });
    } else {
      return throwError('Not logged in')
    }
  }

  public getTask(id: number): Observable<ITask> {
    if (this.accountInfo) {
      const url = `${this.baseUrl}/${id}`;
      return this.httpClient.get<ITask>(url, { params: this.params });
    } else {
      return throwError('Not logged in')
    }
  }

  public updateTask(id: number, task: ITask): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.put<ITask>(url, this.addTenantIdToTask(task));
  }

  public deleteTask(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<number>(url);
  }

  public createTask(task: ITask): Observable<ITask> {
    return this.httpClient.post<ITask>(this.baseUrl, this.addTenantIdToTask(task));
  }

  public createForm(): FormGroup {
    const formControls: TaskFormControls = {
      name: new FormControl(null),
      description: new FormControl(null),
      ownerId: new FormControl(null),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      status: new FormControl(null),
      projectId: new FormControl(null)
    };
    return this.formBuilder.group(formControls);
  }

  private addTenantIdToTask(task: ITask): ITask {
    return this.accountInfo ? {
      ...task,
      tenantId: this.accountInfo.tenantId
    } : task;
  }
}
