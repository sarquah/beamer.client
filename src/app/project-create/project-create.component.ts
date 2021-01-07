import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { IProject } from '../models/interfaces/IProject';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { EStatus } from '../models/enums/EStatus';
import { UserService } from '../services/user.service';
import { IUser } from '../models/interfaces/IUser';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public EStatus = EStatus;
  public user$: Observable<IUser[]>;
  private subscriptions: Subscription[];

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  public ngOnDestroy() {
    this.subscriptions.map((x) => {
      if (x) {
        x.unsubscribe();
      }
    });
  }

  public ngOnInit() {
    this.user$ = this.userService.getUsers();
    this.form = this.projectService.createForm();
    this.subscriptions = [];
    this.subscriptions.push(
      this.user$.subscribe()
    );
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
