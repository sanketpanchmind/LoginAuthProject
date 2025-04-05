import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getAllDepartmentdetails(): Observable<any> {
    return this.http.get('https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetDepartments');
  }

  getEmployeesByDeptId(id: any): Observable<any> {
    return this.http.get('https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetEmployeesByDeptId?id=' + id);
  }
}
