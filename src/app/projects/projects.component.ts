import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../project.service';
import { Observable } from 'rxjs';
import { IProject } from '../models/interfaces/IProject';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public projects$: Observable<IProject[]>;

  constructor(
    private projectService: ProjectService
  ) { }

  public ngOnInit() {
    this.projects$ = this.projectService.getProjects();
  }
}
