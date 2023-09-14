import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for HTTP requests
import { AppRoutingModule } from './app-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component'; // Import the registration component
import { EmployeeService } from './employee.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeListComponent } from './employee-list/employee-list.component'; // Import the employee service

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    EmployeeListComponent // Add the registration component to declarations
  ],
  imports: [
    MatSnackBarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [EmployeeService], // Provide the employee service
  bootstrap: [AppComponent]
})
export class AppModule { }
