import { Component } from '@angular/core';
import { DepartmentService } from 'src/app/core/services/services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent {

  deptdetailsArray: any[] = [];
  empdetailsArray: any[] = [];

  constructor(private departmentService: DepartmentService) {

  }
  ngOnInit() {
    this.getdeptdetails();
  }

  getdeptdetails() {
    this.departmentService.getAllDepartmentdetails().subscribe({
      next: (res: any) => {
        console.log("dept list", res.data);
        this.deptdetailsArray = res.data;
      },
      error: (error: any) => {
        console.log(error, error.message);
      }
    })
  }

  getEmployeeDetailsbyDeptId(id: number) {

    this.departmentService.getEmployeesByDeptId(id).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.empdetailsArray = res.data;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
