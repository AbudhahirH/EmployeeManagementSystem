import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee.interface';
import { SalaryFormatterPipe } from '../../pipes/salary-formatter.pipe';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [CommonModule, SalaryFormatterPipe],
  templateUrl: './employee-card.component.html'
})
export class EmployeeCardComponent {
  @Input() employee!: Employee;
  @Output() onEdit = new EventEmitter<Employee>();
  @Output() onDelete = new EventEmitter<Employee>();
}