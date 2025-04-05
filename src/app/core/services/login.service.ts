import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }

  register(obj: any): Observable<any> {
    return this.http.post('https://projectapi.gerasim.in/api/EmployeeManagement/CreateEmployee', obj);
  }

  getdepartment(): Observable<any> {
    return this.http.get('https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetDepartments');
  }


  getlogin(obj: any): Observable<any> {
    return this.http.post('https://freeapi.miniprojectideas.com/api/EmployeeLeave/Login', obj);
  }

  getAllRoles(): Observable<any> {
    return this.http.get('https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetAllRoles');
  }
}
