import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { TaskEditComponent } from './task-edit/task-edit.component';

const routes: Routes = [
  {
    path: 'projects',
    children: [
      {
        path: '',
        component: ProjectsComponent,
      },
      {
        path: 'create',
        component: ProjectCreateComponent,
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            component: ProjectDetailsComponent,
          },
          {
            path: 'edit',
            component: ProjectEditComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'tasks',
    children: [
      {
        path: ':id',
        children: [
          {
            path: 'edit',
            component: TaskEditComponent,
          },
        ],
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
