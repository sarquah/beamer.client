import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { IProject } from '../models/interfaces/IProject';
import { environment } from 'src/environments/environment';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';

type ProjectFormControls = { [field in keyof IProject]?: FormControl };
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'api/v1/project';
  private baseUrl = `${environment.beamerAPIEndpoint}/${this.apiUrl}`;
  private accountInfo: AccountInfo;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private authService: MsalService
  ) {
    this.accountInfo = this.authService.instance.getAllAccounts().pop();
  }

  public getProjects(): Observable<IProject[]> {
    const params: HttpParams = new HttpParams().set('tenantId', this.accountInfo.tenantId);
    const url = `${this.baseUrl}/projects`;
    return this.httpClient.get<IProject[]>(url, { params });
  }

  public getProject(id: number): Observable<IProject> {
    const params: HttpParams = new HttpParams().set('tenantId', this.accountInfo.tenantId);
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<IProject>(url, { params });
  }

  public updateProject(id: number, project: IProject): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.put<IProject>(url, this.addTenantIdToProject(project));
  }

  public deleteProject(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<number>(url);
  }

  public createProject(project: IProject): Observable<IProject> {
    return this.httpClient.post<IProject>(this.baseUrl, this.addTenantIdToProject(project));
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

  private addTenantIdToProject(project: IProject): IProject {
    return {
      ...project,
      tenantId: this.accountInfo.tenantId
    };
  }
}
