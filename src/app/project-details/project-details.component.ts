import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from './../project.service';
import { IProject } from '../iproject';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
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

  updateProject(id: number, project: any) {
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

  deleteProject(id: number) {
    const deletedProjectObservable = this.projectService.deleteProject(id);
    deletedProjectObservable.subscribe(data => {
      this.project = null;
      this.projectObservable = null;
      this.router.navigate(['./projects']);
    });
  }

  switchEditMode() {
    this.editMode = !this.editMode;
  }

  ngOnInit() {
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
}
