import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITask } from '../models/interfaces/ITask';
import { ITimeregistration as ITimeregistration } from '../models/interfaces/ITimeregistration';
import { TaskService } from '../services/task.service';
import { TimeregistrationService } from '../services/timeregistration.service';

@Component({
  selector: 'app-timeregistrations',
  templateUrl: './timeregistrations.component.html',
  styleUrls: ['./timeregistrations.component.scss']
})
export class TimeregistrationsComponent implements OnInit {
  private taskId: number;
  private timeregistrations$: Observable<ITimeregistration[]>;
  public task$: Observable<ITask>;
  public displayedColumns: string[] = ['startDate', 'endDate', 'owner', 'edit', 'delete'];
  public dataSource: MatTableDataSource<ITimeregistration>;

  constructor(
    private timeregistrationService: TimeregistrationService,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) { }

  public ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id')
    if (taskId) {
      this.taskId = parseInt(taskId, 10);
    }
    this.task$ = this.taskService.getTask(this.taskId);
    this.task$.subscribe(x => console.log(x));
    this.timeregistrations$ = this.timeregistrationService.getTimeregistrationsForTask(this.taskId);
    this.timeregistrations$.subscribe(x => {
      console.log(x);
      this.dataSource = new MatTableDataSource<ITimeregistration>(x);
    });
  }

  public delete(id: number) {
    this.timeregistrationService.deleteTimeregistration(id).subscribe(() => this.ngOnInit());
  }
}
