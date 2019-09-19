import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProject } from './iproject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects = [];
  baseUrl = 'http://localhost:65100/api/v1/project';

  constructor(private httpClient: HttpClient) {}

  addProject(project: IProject) {
    this.projects.push(project);
  }

  getProjects() {
    return this.httpClient.get(`${this.baseUrl}/projects`);
  }

  getProject(id: number) {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }
  // Todo: Add methods for updating and deleting projects
}
