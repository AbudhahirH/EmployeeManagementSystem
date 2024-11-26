import { Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';

export const routes: Routes = [
  { path: '', component: EmployeeDashboardComponent },
  { path: 'new-employee', component: NewEmployeeComponent }
];