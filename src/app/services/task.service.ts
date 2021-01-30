import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ITask } from '../models/interfaces/ITask';

type TaskFormControls = { [field in keyof ITask]?: FormControl };
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'api/v1/task';
  private baseUrl = `${environment.beamerAPIEndpoint}/${this.apiUrl}`;
  private accountInfo: AccountInfo;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private authService: MsalService
  ) {
    if (this.authService.instance.getAllAccounts().length > 0) {
      this.accountInfo = this.authService.instance.getAllAccounts()[0];
    }
  }

  public getTasks(): Observable<ITask[]> {
    const params: HttpParams = new HttpParams().set('tenantId', this.accountInfo.tenantId);
    const url = `${this.baseUrl}/tasks`;
    return this.httpClient.get<ITask[]>(url, { params });
  }

  public getTask(id: number): Observable<ITask> {
    const params: HttpParams = new HttpParams().set('tenantId', this.accountInfo.tenantId);
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<ITask>(url, { params });
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
    return {
      ...task,
      tenantId: this.accountInfo.tenantId
    };
  }
}
