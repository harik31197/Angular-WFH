import { Component, OnInit } from '@angular/core';
import { Employee } from '../appdata/employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[];


  constructor(private employeeService: EmployeeService, private router: Router) { }
  getEmployees() {
    this.employeeService.getEmployees()
    .subscribe(employees => (this.employees = employees));
  }

  ngOnInit() {
    this.getEmployees();
  }
  add(name: string): void {
    name = name.trim();
    if (!name ) { return; }
    this.employeeService.addEmployee({ name } as Employee)
      .subscribe(employee => {
        this.employees.push(employee);
      });
  }

  delete(employee: Employee): void {
    this.employees = this.employees.filter(h => h !== employee);
    this.employeeService.deleteEmployee(employee).subscribe();
  }

}
