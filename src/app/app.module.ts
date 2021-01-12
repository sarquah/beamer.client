import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EnumPipe } from './pipes/enum.pipe';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { ProjectComponent } from './project/project.component';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { TasksComponent } from './tasks/tasks.component';
import { MatIconModule } from '@angular/material/icon';
import { TaskEditComponent } from './task-edit/task-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectDetailsComponent,
    ProjectEditComponent,
    ProjectCreateComponent,
    EnumPipe,
    EnumToArrayPipe,
    TaskDetailsComponent,
    ProjectComponent,
    TasksComponent,
    TaskEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    CdkTableModule,
    MatIconModule
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'da-DK',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
