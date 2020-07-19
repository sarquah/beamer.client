import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = 'http://localhost:65100/api/v1/project';
  httpOptions;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getProjects() {
    const url = `${this.baseUrl}/projects`;
    return this.httpClient.get(url);
  }

  getProject(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get(url);
  }

  updateProject(id: number, project: any) {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.put(url, project, this.httpOptions);
  }

  deleteProject(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url, this.httpOptions);
  }

  // TODO add functionality to create project
}
