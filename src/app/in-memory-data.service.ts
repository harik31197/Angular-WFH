import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import {Employee} from './appdata/employee'

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees = [
      { id: 11, name: 'Kohli' },
      { id: 12, name: 'Dhoni' },
      { id: 13, name: 'Bumrah' },
      { id: 14, name: 'Ganguly' },
      { id: 15, name: 'Mongia' },
      { id: 16, name: 'Rohit' },
      { id: 17, name: 'Rahane' },
      { id: 18, name: 'Sachin' },
      { id: 19, name: 'Ashwin' },
      { id: 20, name: 'Jadeja' }
  ];
  return (employees);
}
genId(employees: Employee[]): number {
  return employees.length > 0 ? Math.max(...employees.map(hero => hero.id)) + 1 : 11;
}
}