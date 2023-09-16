import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  employee: any = {}; // Initialize an empty employee object
  profilePicFile: File | null = null; // Initialize a variable to store the profile picture file
  emailExistsError: boolean = false;
  successmessage: string = "";

  constructor(private employeeService: EmployeeService,private snackBar: MatSnackBar,private router: Router ) {}

  registerEmployee() {
    this.emailExistsError = false;
    this.successmessage = "";
    // Call the registerEmployee method from the EmployeeService
    // Check if the form is valid before submitting
    if (this.isFormValid()) {
      this.employeeService.registerEmployee(this.employee, this.profilePicFile)
        .subscribe(
          (response) => {
            console.log('Employee registered successfully:', response);
            // Optionally, reset the form or navigate to another page
            this.successmessage = "Employee registered successfully";
            this.resetForm();
            this.snackBar.open(this.successmessage, 'Close', {
              duration: 3000, // Duration in milliseconds
              panelClass: 'success-snackbar' // Add your custom CSS class for styling
            });
          },
          (error) => {
            console.error('Error registering employee:', error);
            this.emailExistsError = true;
            // Handle error
          }
        );
    } else {
      console.error('Form is not valid. Please check the required fields.');
    }
  }

  onFileSelected(event: any) {
    // Capture the selected file from the file input element
    const files = event.target.files;
    if (files.length > 0) {
      this.profilePicFile = files[0];
    }
  }

  resetForm() {
    // Reset the employee object and file input
    this.employee = {};
    this.profilePicFile = null;
  }

  navigateToEmployeeList() {
    this.router.navigate(['/employeelist']); // Replace 'employee-list' with the actual route to the employee list page
  }

  private isFormValid(): boolean {
    // Check if the required fields are filled out
    return (
      this.employee.first_name &&
      this.employee.last_name &&
      this.employee.designation &&
      this.employee.rate_type &&
      this.employee.email &&
      this.employee.country
    );
  }
}
