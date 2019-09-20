import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../project.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Observable<any>;

  constructor(private projectService: ProjectService) {}
  ngOnInit() {
    this.projects = this.projectService.getProjects();
  }
}
