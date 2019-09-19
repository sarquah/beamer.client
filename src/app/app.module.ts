import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, ProjectsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([{ path: '', component: ProjectsComponent }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
