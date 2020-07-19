import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from './../project.service';
import { IProject } from '../iproject';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  public project$: Observable<IProject>;
  public form: FormGroup;
  private subscriptions: Subscription[];
  private id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit() {
    this.form = this.createForm();
    this.subscriptions = [];
    this.subscriptions.push(
      this.route.paramMap.subscribe((params) => {
        this.id = parseInt(params.get('id'), 10);
        this.project$ = this.projectService.getProject(this.id);
      })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.map((x) => {
      if (x) {
        x.unsubscribe();
      }
    });
  }

  public deleteProject() {
    this.project$ = this.projectService.deleteProject(this.id);
    this.router.navigate(['./projects']);
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: '',
      description: '',
      owner: '',
    });
  }
}
