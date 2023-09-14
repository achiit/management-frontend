import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5000/api/employees/add'; // Update with your API endpoint

  constructor(private http: HttpClient) { }
  
  registerEmployee(employeeData: any, file: File | null) {
    // Create a FormData object to send the employee data and profile picture (if provided)
    const formData = new FormData();
    formData.append('first_name', employeeData.first_name);
    formData.append('last_name', employeeData.last_name);
    formData.append('designation', employeeData.designation);
    formData.append('rate_type', employeeData.rate_type);
    formData.append('email', employeeData.email);
    formData.append('address_line1', employeeData.address_line1);
    formData.append('address_line2', employeeData.address_line2);
    formData.append('city', employeeData.city);
    formData.append('phone_number', employeeData.phone_number);
    formData.append('salary', String(employeeData.salary));
    formData.append('blood_group', employeeData.blood_group);
    formData.append('country', employeeData.country);
    formData.append('zipcode', employeeData.zipcode);

    // Append the profile picture if provided
    if (file) {
      formData.append('profile_pic', file, file.name);
    }

    // Send the POST request to your API
    return this.http.post(this.apiUrl, formData);
  }
}
