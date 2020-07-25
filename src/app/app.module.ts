import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { EnumPipe } from './pipes/enum.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectDetailsComponent,
    ProjectEditComponent,
    ProjectCreateComponent,
    EnumPipe,
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
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'da-DK',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
