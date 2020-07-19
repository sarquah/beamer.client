import { Component, OnInit } from '@angular/core';
import { IProject } from '../iproject';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {

  project: IProject;
  projectObservable: Observable<any>;
  updateForm: FormGroup;
  editMode: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {
    this.updateForm = this.formBuilder.group({
      name: '',
      description: '',
      owner: ''
    });
    this.editMode = false;
  }

  public ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('id'), 10);
      this.projectObservable = this.projectService.getProject(id);
      this.projectObservable.subscribe((data: any) => {
        this.project = {
          id: data.id,
          name: data.name,
          owner: data.ownerName,
          description: data.description
        };
      });
    });
  }

  public updateProject(id: number, project: any) {
    this.switchEditMode();
    project.id = id;
    const updatedProjectObservable = this.projectService.updateProject(
      id,
      project
    );
    updatedProjectObservable.subscribe(data => {
      this.project = project;
    });
  }

  public deleteProject(id: number) {
    const deletedProjectObservable = this.projectService.deleteProject(id);
    deletedProjectObservable.subscribe(data => {
      this.project = null;
      this.projectObservable = null;
      this.router.navigate(['./projects']);
    });
  }

  public switchEditMode() {
    this.editMode = !this.editMode;
  }
}
