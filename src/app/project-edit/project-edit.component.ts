import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { OnDestroy } from '@angular/core';
import { IProject } from './../models/interfaces/IProject';

type ProjectFormControls = { [field in keyof IProject]?: FormControl };
@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
})
export class ProjectEditComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public project$: Observable<IProject>;
  private id: number;
  private subscriptions: Subscription[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {}

  public ngOnDestroy() {
    this.subscriptions.map((x) => {
      if (x) {
        x.unsubscribe();
      }
    });
  }

  public ngOnInit() {
    this.form = this.createForm();
    this.subscriptions = [];
    this.subscriptions.push(
      this.route.paramMap.subscribe((params) => {
        this.id = parseInt(params.get('id'), 10);
        this.project$ = this.projectService.getProject(this.id);
        this.subscriptions.push(
          this.project$.subscribe((x) => this.form.patchValue(x))
        );
      })
    );
  }

  public updateProject() {
    const project: IProject = this.form.value;
    project.id = this.id;
    this.subscriptions.push(
      this.projectService
        .updateProject(this.id, project)
        .subscribe((x) => this.router.navigate(['./projects']))
    );
  }

  private createForm(): FormGroup {
    const formControls: ProjectFormControls = {
      id: new FormControl(null),
      name: new FormControl(null),
      description: new FormControl(null),
      ownerName: new FormControl(null),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      status: new FormControl(null)
    };
    return this.formBuilder.group(formControls);
  }
}
