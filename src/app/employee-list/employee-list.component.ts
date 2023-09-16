// employee-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  // ... (component decorator)
  selector: 'app-employee-list', // You need to provide a selector
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.http.get<Employee[]>('http://localhost:5000/api/employees/list')
      .subscribe((data) => {
        this.employees = data;
        this.employees.forEach((employee) => {
        });
      });
  }
  deleteEmployee(employeeId: number) {
    // Send a DELETE request to your API to delete the employee
    this.http.delete(`http://localhost:5000/api/employees/${employeeId}`).subscribe(
      () => {
        // If the employee is successfully deleted, update the local employee list
        this.employees = this.employees.filter(employee => employee.id !== employeeId);
        this.snackBar.open('Employee deleted successfully', 'Dismiss', {
          duration: 3000, // Duration in milliseconds
        });
      },
      (error) => {
        console.error('Error deleting employee:', error);
        this.snackBar.open('Error deleting error', 'Dismiss', {
          duration: 3000, // Duration in milliseconds
        });
        // Handle error, display a message, or implement error handling as needed
      }
    );
  }
  
}
