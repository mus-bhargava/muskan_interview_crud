import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { LocalStorageService } from './service/local-storage.service';

@NgModule({
  declarations: [AppComponent, StudentListComponent, StudentFormComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [LocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
