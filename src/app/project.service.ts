import { Injectable } from '@angular/core';
import { IProject } from './iproject';
import { projects } from './projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects = projects;

  addProject(project: IProject) {
    this.projects.push(project);
  }

  getProjects() {
    return this.projects;
  }
  // Todo: Add methods for updating and deleting projects
}
