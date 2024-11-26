import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salaryFormatter',
  standalone: true
})
export class SalaryFormatterPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
}