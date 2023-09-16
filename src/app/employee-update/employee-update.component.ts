import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
  updatedEmployee: any = {}; // Initialize with an empty object

  constructor(private route: ActivatedRoute, private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {}


  ngOnInit() {
    // Retrieve employee data by ID from the route params
    this.route.paramMap.subscribe(params => {
      const employeeId = params.get('id');
      console.log('Employee ID:', employeeId);
      // Check if employeeId is not undefined
      if (employeeId) {
        // Make an HTTP request to fetch the employee data by ID
        this.http.get(`http://localhost:5000/api/employees/${employeeId}`).subscribe((data: any) => {
          this.updatedEmployee = data; // Populate the form with fetched data
        });
      } else {
        console.error('Employee ID is undefined.');
        // Handle this error case as needed, e.g., redirect to an error page or display an error message to the user.
      }
    });
  }

  updateEmployee() {
    // Make an HTTP request to update the employee data by ID
    const employeeId = this.updatedEmployee.id;
    this.http.put(`http://localhost:5000/api/employees/${employeeId}`, this.updatedEmployee).subscribe((response: any) => {
      console.log('Employee updated successfully', response);
      
      // Show a success Snackbar
      this.snackBar.open('Employee updated successfully', 'Dismiss', {
        duration: 3000, // Duration in milliseconds
      });
  
      // Navigate back to the employee list
      this.router.navigate(['/employeelist']);
    });
  }
  
}
