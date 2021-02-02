import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { IProject } from '../models/interfaces/IProject';
import { environment } from '../../environments/environment';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';

type ProjectFormControls = { [field in keyof IProject]?: FormControl };
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly apiUrl = 'api/v1/project';
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

  public getProjects(): Observable<IProject[]> {
    if (this.accountInfo) {
      const url = `${this.baseUrl}/projects`;
      return this.httpClient.get<IProject[]>(url, { params: this.params });
    } else {
      return throwError('Not logged in')
    }
  }

  public getProject(id: number): Observable<IProject> {
    if (this.accountInfo) {
      const url = `${this.baseUrl}/${id}`;
      return this.httpClient.get<IProject>(url, { params: this.params });
    } else {
      return throwError('Not logged in')
    }
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
    return this.accountInfo ? {
      ...project,
      tenantId: this.accountInfo.tenantId
    } : project;
  }
}
