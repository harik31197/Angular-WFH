import { Injectable } from '@angular/core';
import {Employee} from './appdata/employee'
import {EMPLOYEES} from './appdata/mock-employee'
import { Observable, of } from 'rxjs';
import{MessageService} from './message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private employeeUrl = 'api/employees';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeeUrl)
      .pipe(
        tap(_ => this.log('fetched employees')),
        catchError(this.handleError<Employee[]>('getEmployees', []))
      );
  }
  getEmployeeNo404<Data>(id: number): Observable<Employee> {
    const url = `${this.employeeUrl}/?id=${id}`;
    return this.http.get<Employee[]>(url)
      .pipe(
        map(employees => employees[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} employee id=${id}`);
        }),
        catchError(this.handleError<Employee>(`getEmployee id=${id}`))
      );
  }


  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeeUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
    tap(_ => this.log(`fetched employee id=${id}`)),
    catchError(this.handleError<Employee>(`getEmployee id=${id}`))
  );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeeUrl, employee, this.httpOptions).pipe(
      tap((newEmployee: Employee) => this.log(`added Employee w/ id=${newEmployee.id}`)),
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.employeeUrl, employee, this.httpOptions).pipe(
      tap(_ => this.log(`updated employee id=${employee.id}`)),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }
  deleteEmployee(employee: Employee | number): Observable<Employee> {
    const id = typeof employee === 'number' ? employee : employee.id;
    const url = `${this.employeeUrl}/${id}`;

    return this.http.delete<Employee>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Employee id=${id}`)),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }  
  searchEmployees(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Employee[]>(`${this.employeeUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found employees matching "${term}"`)),
      catchError(this.handleError<Employee[]>('searchEmployees', []))
    );
  }

  private log(message:string){
    this.messageService.add(`EmployeeService:${message}`);
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
  
      this.log(`${operation} failed: ${error.message}`);
 
      return of(result as T);
    };
  }

  }

  
 
