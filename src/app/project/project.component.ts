import { Component, Input } from '@angular/core';
import { EStatus } from '../models/enums/EStatus';
import { IProject } from '../models/interfaces/IProject';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @Input() project: IProject;
  public EStatus = EStatus;

  constructor() { }
}
