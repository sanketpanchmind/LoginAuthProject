import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinner } from 'ngx-spinner';
import { LoginService } from 'src/app/core/services/login.service';
import { AuthService } from 'src/app/core/services/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  empregisterform: FormGroup | any;
  loginform: FormGroup | any;
  deptArray: any[] = [];

  constructor(private loginService: LoginService, private fb: FormBuilder, private authservice: AuthService, private router: Router) {

  }
  ngOnInit() {
    this.formfields();
    this.loginformfields();
    this.getdept();
  }
  formfields() {
    this.empregisterform = this.fb.group({
      employeeName: new FormControl(''),
      contactNo: new FormControl(''),
      emailId: new FormControl(''),
      deptId: new FormControl(''),
      password: new FormControl(''),
      gender: new FormControl(''),
      role: new FormControl(''),
      // createdDate: new Date()
    })
  }

  loginformfields() {
    this.loginform = this.fb.group({
      emailId: new FormControl(''),
      password: new FormControl(''),
    })
  }

  getdept() {
    this.loginService.getdepartment().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.deptArray = res.data;
      },
      error: (res: any) => {
        console.log(res.error);
      }
    })
  }
  empregister() {
    console.log(this.empregisterform.value);
    let obj = this.empregisterform.value;

    let params = {
      employeeName: obj?.employeeName,
      contactNo: obj?.contactNo,
      emailId: obj?.emailId,
      deptId: obj?.deptId,
      password: obj?.password,
      gender: obj?.gender,
      role: obj?.role,
      createdDate: new Date()
    }


    this.loginService.register(params).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }


  login() {
    console.log(this.loginform.value);

    let obj = this.loginform.value;

    const params = {
      emailId: obj?.emailId,
      password: obj?.password,
    }

    this.loginService.getlogin(params).subscribe({
      next: (res: any) => {
        if (res.result) {
          console.log(res.data);
          localStorage.setItem('currentuser', JSON.stringify(res.data));
          this.router.navigateByUrl('/dashboard');
        }
      },
      error: (error: any) => {
        console.log(error);
        this.router.navigateByUrl('/login');

      }
    })
  }

}
