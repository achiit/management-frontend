import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component'; // Import the registration component
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent }, // Add a route for the registration page
  { path: 'employeelist', component: EmployeeListComponent }, // Add a route for the registration page
  { path: '', redirectTo: '/registration', pathMatch: 'full' },
  // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
