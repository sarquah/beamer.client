import { Location } from '@angular/common'
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
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public task$: Observable<IProject>;
  public users$: Observable<IUser[]>;
  public projects$: Observable<IProject[]>;
  public EStatus = EStatus;
  private id: number;
  private subscriptions: Subscription[];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService,
    private projectService: ProjectService,
    private location: Location
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
    this.task$ = this.taskService.getTask(this.id);
    this.users$ = this.userService.getUsers();
    this.projects$ = this.projectService.getProjects();
    this.subscriptions.push(
      this.task$.subscribe((x) => this.form.patchValue(x)),
      this.users$.subscribe(),
      this.projects$.subscribe()
    );
  }

  public updateTask() {
    const task: ITask = this.form.value;
    task.id = this.id;
    this.subscriptions.push(
      this.taskService
        .updateTask(this.id, task)
        .subscribe(() => {
          this.goBack()
        })
    );
  }

  public goBack() {
    this.location.back();
  }
}
