import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProject } from '../models/interfaces/IProject';
import { EStatus } from '../models/enums/EStatus';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public projects$: Observable<IProject[]>;
  public EStatus = EStatus;

  constructor(
    private projectService: ProjectService
  ) { }

  public ngOnInit() {
    this.projects$ = this.projectService.getProjects();
  }
}
