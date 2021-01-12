import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { EStatus } from '../models/enums/EStatus';
import { IProject } from '../models/interfaces/IProject';
import { ITask } from '../models/interfaces/ITask';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  @Input() project: Observable<IProject>;
  public displayedColumns: string[] = ['name', 'description', 'status', 'owner', 'startDate', 'endDate', 'edit', 'delete'];
  public dataSource: MatTableDataSource<ITask>;
  public EStatus = EStatus;
  private subscriptions: Subscription[];

  constructor() { }

  public ngOnInit() {
    this.subscriptions = [];
    this.subscriptions.push(
      this.project.subscribe(x => {
        this.dataSource = new MatTableDataSource<ITask>(x.tasks);
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

  public delete(id: number) {
    console.log('Deleting ', id);
  }
}
