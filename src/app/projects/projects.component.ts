import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from './../project.service';
import { IProject } from '../iproject';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}
  projects = this.projectService.getProjects();
  ngOnInit() {}
  addProject(project: IProject) {
    window.alert('Project added!');
    this.projectService.addProject(project);
  }
}
