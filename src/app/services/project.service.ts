import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { IProject } from '../models/interfaces/IProject';
import { environment } from 'src/environments/environment';

type ProjectFormControls = { [field in keyof IProject]?: FormControl };
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'api/v1/project';
  private baseUrl = `${environment.beamerAPIEndpoint}/${this.apiUrl}`;
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

  public getProjects(): Observable<IProject[]> {
    const url = `${this.baseUrl}/projects`;
    return this.httpClient.get<IProject[]>(url);
  }

  public getProject(id: number): Observable<IProject> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<IProject>(url);
  }

  public updateProject(id: number, project: IProject): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.put<IProject>(url, project, this.httpOptions);
  }

  public deleteProject(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<number>(url, this.httpOptions);
  }

  public createProject(project: IProject): Observable<IProject> {
    return this.httpClient.post<IProject>(this.baseUrl, project);
  }

  public createForm(): FormGroup {
    const formControls: ProjectFormControls = {
      name: new FormControl(null),
      description: new FormControl(null),
      ownerId: new FormControl(null),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      status: new FormControl(null),
    };
    return this.formBuilder.group(formControls);
  }
}
