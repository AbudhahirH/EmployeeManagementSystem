import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.interface';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';
import { HighlightDirective } from '../../directives/highlight.directive';
import { SalaryFormatterPipe } from '../../pipes/salary-formatter.pipe';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AgGridAngular,
    EmployeeCardComponent,
    HighlightDirective,
    SalaryFormatterPipe
  ],
  templateUrl: './employee-dashboard.component.html',
  providers: [SalaryFormatterPipe]
  
})
export class EmployeeDashboardComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  
  private gridApi!: GridApi;
  rowData: Employee[] = [];
  featuredEmployee?: Employee;
  lastUpdated = new Date();

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  
  columnDefs: ColDef[] = [
    { 
      field: 'name',
      headerName: 'Employee Name',
      minWidth: 150
    },
    { 
      field: 'position',
      headerName: 'Position',
      minWidth: 120
    },
    { 
      field: 'department',
      headerName: 'Department',
      minWidth: 120
    },
    { 
      field: 'salary',
      headerName: 'Salary',
      minWidth: 120,
      valueFormatter: params => this.salaryFormatter.transform(params.value)
    }
  ];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private salaryFormatter: SalaryFormatterPipe
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.gridApi.sizeColumnsToFit();
      });
    });
  }

  private loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.rowData = [...employees];
        this.featuredEmployee = employees[0];
        if (this.gridApi) {
          this.gridApi.setRowData(employees);
        }
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      }
    });
  }

  handleEdit(employee: Employee) {
    console.log('Edit employee:', employee);
  }

  handleDelete(employee: Employee) {
    console.log('Delete employee:', employee);
  }

  navigateToNewEmployee() {
    this.router.navigate(['/new-employee']);
  }

  exportToCSV() {
    this.agGrid.api.exportDataAsCsv();
  }
}