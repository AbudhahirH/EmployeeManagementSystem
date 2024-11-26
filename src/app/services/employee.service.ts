import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [
    { name: 'John Doe', position: 'Developer', department: 'IT', salary: 75000 },
    { name: 'Jane Smith', position: 'Manager', department: 'HR', salary: 85000 },
    { name: 'Bob Johnson', position: 'Designer', department: 'UX', salary: 70000 },
    { name: 'Alice Williams', position: 'Senior Developer', department: 'IT', salary: 95000 },
    { name: 'Charlie Brown', position: 'Product Manager', department: 'Product', salary: 90000 }
  ];

  private employeesSubject = new BehaviorSubject<Employee[]>(this.employees);

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  addEmployee(employee: Employee) {
    this.employees.push(employee);
    this.employeesSubject.next(this.employees);
  }
}