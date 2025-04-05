import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';
import { DepartmentService } from 'src/app/core/services/services/department.service';
import { EmployeeService } from 'src/app/core/services/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  createNewEmployeeform: FormGroup | any;

  allEmpArraytbl: any[] = [];
  alldeptsArray: any[] = [];
  allroles: any[] = [];
  editflag: boolean = false;

  @ViewChild('myModal') modalElement!: ElementRef;

  constructor(private employeeService: EmployeeService, private departmentService: DepartmentService, private loginService: LoginService, private renderer: Renderer2, private http: HttpClient, private fb: FormBuilder) {

  }
  ngOnInit() {
    this.employeeformfields();
    this.getEmpList();
    this.getAlldepartment();
    this.getAllRoles();
  }

  openModal() {
    this.modalElement.nativeElement.style.display = "block";
  }
  closeModal() {
    this.modalElement.nativeElement.style.display = "none";
  }


  employeeformfields() {
    this.createNewEmployeeform = this.fb.group({
      employeeId: new FormControl(''),
      employeeName: new FormControl(''),
      contactNo: new FormControl(''),
      emailId: new FormControl(''),
      deptId: new FormControl(''),
      password: new FormControl(''),
      gender: new FormControl(''),
      role: new FormControl('')
    })
  }

  getAllRoles() {
    this.loginService.getAllRoles().subscribe({
      next: (res: any) => {
        console.log("Roles - ", res.data);
        this.allroles = res.data;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
  getAlldepartment() {
    this.departmentService.getAllDepartmentdetails().subscribe({
      next: (res: any) => {
        if (res.result == true) {
          console.log("Department Array - ", res.data);
          this.alldeptsArray = res.data;
        }
      }
    })
  }
  getEmpList() {
    this.employeeService.getAllEmployees().subscribe({
      next: (res: any) => {
        if (res.result == true) {
          console.log("Employee list - ", res.data);
          this.allEmpArraytbl = res.data;
        }
        else { console.log("Employees not found"); }
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }



  updateEmpbyId(emp: any) {
    this.editflag = true;
    console.log(emp.employeeId);
    const oldemp = this.allEmpArraytbl.find((data: any) => data.employeeId == emp.employeeId);
    console.log("oldemp from arrray - ", oldemp.employeeId);
    this.openModal();

    this.http.get(`https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetEmployeeById?id=${oldemp.employeeId} `).subscribe({
      next: (res: any) => {
        console.log("patch emp - ", res.data);

        this.createNewEmployeeform.patchValue({
          employeeId: res.data?.employeeId,
          employeeName: res.data?.employeeName,
          contactNo: res.data?.contactNo,
          emailId: res.data?.emailId,
          deptId: res.data?.deptId,
          password: res.data?.password,
          gender: res.data?.gender,
          role: res.data?.role,
        })

      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  update() {
    this.editflag = true;
    let obj = this.createNewEmployeeform.value;

    const params: any = {
      employeeId: obj?.employeeId,
      employeeName: obj?.employeeName,
      contactNo: obj?.contactNo,
      emailId: obj?.emailId,
      deptId: obj?.deptId,
      password: obj?.password,
      gender: obj?.gender,
      role: obj?.role
    }
    console.log("Updated emp values - ", params);
    this.employeeService.updateEmpbyId(params).subscribe({
      next: (res: any) => {
        console.log("Updated data", res.result, res.data);
        this.closeModal();
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }


  submit() {
    console.log(this.createNewEmployeeform.value);

    let obj = this.createNewEmployeeform.value;
    if (!obj) {
      return;
    }

    const params: any = {
      employeeName: obj?.employeeName,
      contactNo: obj?.contactNo,
      emailId: obj?.emailId,
      deptId: obj?.deptId,
      password: obj?.password,
      gender: obj?.gender,
      role: obj?.role
    }

    this.employeeService.createNewEmployees(params).subscribe({
      next: (res: any) => {
        if (res.result == true) {

          console.log("New Record Created Successfully - ", res.result);
        }
        else {
          console.log("Error in Creating new Record - ", res.result);
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }


  deletebyId(id: number) {
    console.log(id);
    return this.employeeService.deleteempbyId(id).subscribe({
      next: (res: any) => {
        if (res.result == true) {

          console.log(" Record Deleted Successfully - ", res.result);
        }
        else {
          console.log("Error in Deleting Record - ", res.result);
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
