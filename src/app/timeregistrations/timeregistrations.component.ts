import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ITask } from '../models/interfaces/ITask';
import { ITimeregistration } from '../models/interfaces/ITimeregistration';
import { TaskService } from '../services/task.service';
import { TimeregistrationService } from '../services/timeregistration.service';

@Component({
  selector: 'app-timeregistrations',
  templateUrl: './timeregistrations.component.html',
  styleUrls: ['./timeregistrations.component.scss'],
})
export class TimeregistrationsComponent implements OnInit, OnDestroy {
  private taskId: number;
  private timeregistrations$: Observable<ITimeregistration[]>;
  private subscriptions: Subscription[];
  public task$: Observable<ITask>;
  public displayedColumns: string[] = [
    'date',
    'hours',
    'owner',
    'edit',
    'delete',
  ];
  public dataSource: MatTableDataSource<ITimeregistration>;

  constructor(
    private timeregistrationService: TimeregistrationService,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  public ngOnInit() {
    this.subscriptions = [];
    const taskId = this.route.snapshot.paramMap.get('taskId');
    if (taskId) {
      this.taskId = parseInt(taskId, 10);
    }
    this.task$ = this.taskService.getTask(this.taskId);
    this.timeregistrations$ = this.timeregistrationService.getTimeregistrationsForTask(
      this.taskId
    );
    this.subscriptions.push(
      this.timeregistrations$.subscribe((x) => {
        this.dataSource = new MatTableDataSource<ITimeregistration>(x);
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
    this.subscriptions.push(
      this.timeregistrationService
        .deleteTimeregistration(id)
        .subscribe(() => this.ngOnInit())
    );
  }
}
