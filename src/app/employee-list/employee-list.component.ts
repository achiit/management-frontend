// employee-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee.model';

@Component({
  // ... (component decorator)
  selector: 'app-employee-list', // You need to provide a selector
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Employee[]>('http://localhost:5000/api/employees/list')
      .subscribe((data) => {
        this.employees = data;
        this.employees.forEach((employee) => {
          // Convert the binary code to an image URL
          employee.profile_pic = this.convertBinaryToImageURL(employee.profile_pic);
        });
      });
  }

  private convertBinaryToImageURL(binaryCode: string): string {
    // Assuming the binary code represents a PNG image
    // You may need to adapt this based on the actual image format
    const base64Image = atob(binaryCode);
    const byteArray = new Uint8Array(base64Image.length);
    for (let i = 0; i < base64Image.length; i++) {
      byteArray[i] = base64Image.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: 'image/png' });
    console.log(URL.createObjectURL(blob));
    return URL.createObjectURL(blob);
  }
}
