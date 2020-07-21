import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IProject } from '../models/interfaces/IProject';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private subscriptions: Subscription[];

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) {}

  public ngOnDestroy() {
    this.subscriptions.map((x) => {
      if (x) {
        x.unsubscribe();
      }
    });
  }

  public ngOnInit() {
    this.form = this.projectService.createForm();
    this.subscriptions = [];
  }

  public createProject() {
    const project: IProject = this.form.value;
    this.subscriptions.push(
      this.projectService
        .createProject(project)
        .subscribe(() => this.router.navigate(['./projects']))
    );
  }
}
