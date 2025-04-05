import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<any> {
    return this.http.get('https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetEmployees');
  }

  createNewEmployees(obj: any): Observable<any> {
    return this.http.post('https://freeapi.miniprojectideas.com/api/EmployeeLeave/CreateEmployee', obj);
  }

  deleteempbyId(id: number): Observable<any> {
    return this.http.delete('https://freeapi.miniprojectideas.com/api/EmployeeLeave/DeleteEmployee?id=' + id);
  }

  updateEmpbyId(obj: any): Observable<any> {
    return this.http.put('https://freeapi.miniprojectideas.com/api/EmployeeLeave/UpdateEmployee', obj);
  }
}
