import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITask } from '../models/interfaces/ITask';

type TaskFormControls = { [field in keyof ITask]?: FormControl };
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'api/v1/task';
  private baseUrl = `${environment.hostName}/${this.apiUrl}`;
  private httpOptions;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  public getTasks(): Observable<ITask[]> {
    const url = `${this.baseUrl}/tasks`;
    return this.httpClient.get<ITask[]>(url);
  }

  public getTask(id: number): Observable<ITask> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<ITask>(url);
  }

  public updateTask(id: number, project: ITask): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.put<ITask>(url, project, this.httpOptions);
  }

  public deleteTask(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<number>(url, this.httpOptions);
  }

  public createTask(task: ITask): Observable<ITask> {
    return this.httpClient.post<ITask>(this.baseUrl, task);
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
}
