import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OnDestroy } from '@angular/core';
import { IProject } from './../models/interfaces/IProject';
import { ProjectService } from '../services/project.service';
import { EStatus } from '../models/enums/EStatus';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
})
export class ProjectEditComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public project$: Observable<IProject>;
  public EStatus = EStatus;
  private id: number;
  private subscriptions: Subscription[];

  constructor(
    private route: ActivatedRoute,
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
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.project$ = this.projectService.getProject(this.id);
    this.subscriptions.push(
      this.project$.subscribe((x) => this.form.patchValue(x))
    );
  }

  public updateProject() {
    const project: IProject = this.form.value;
    project.id = this.id;
    this.subscriptions.push(
      this.projectService
        .updateProject(this.id, project)
        .subscribe(() => this.router.navigate(['./projects']))
    );
  }
}
