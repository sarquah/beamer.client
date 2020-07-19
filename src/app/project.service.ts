import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProject } from './models/interfaces/IProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private hostName = 'http://localhost:65100';
  private apiUrl = '/api/v1/project';
  private baseUrl = `${this.hostName}${this.apiUrl}`;
  private httpOptions;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
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

  public updateProject(id: number, project: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.put(url, project, this.httpOptions);
  }

  public deleteProject(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url, this.httpOptions);
  }

  // TODO add functionality to create project
}
