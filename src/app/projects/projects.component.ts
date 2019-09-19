import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from './../project.service';
import { IProject } from '../iproject';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}
  ngOnInit() {
    this.projects = this.projectService.getProjects();
  }
  addProject(project: IProject) {
    window.alert('Project added!');
    this.projectService.addProject(project);
  }
}
