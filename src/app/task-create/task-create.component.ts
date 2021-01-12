import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { EStatus } from '../models/enums/EStatus';
import { IProject } from '../models/interfaces/IProject';
import { ITask } from '../models/interfaces/ITask';
import { IUser } from '../models/interfaces/IUser';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public users$: Observable<IUser[]>;
  public projects$: Observable<IProject[]>;
  public EStatus = EStatus;
  private id: number;
  private subscriptions: Subscription[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private userService: UserService,
    private projectService: ProjectService
  ) { }

  public ngOnDestroy() {
    this.subscriptions.map((x) => {
      if (x) {
        x.unsubscribe();
      }
    });
  }

  public ngOnInit() {
    this.form = this.taskService.createForm();
    this.subscriptions = [];
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.users$ = this.userService.getUsers();
    this.projects$ = this.projectService.getProjects();
    this.subscriptions.push(
      this.users$.subscribe(),
      this.projects$.subscribe()
    );
  }

  public createTask() {
    const task: ITask = this.form.value;
    this.subscriptions.push(
      this.taskService
        .createTask(task)
        .subscribe(() => {
          this.router.navigate(['./projects'])
        })
    );
  }
}
