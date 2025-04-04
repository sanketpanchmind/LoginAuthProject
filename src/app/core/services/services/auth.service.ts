import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private token = 'logintoken';
  private refreshtoken = 'refreshtoken';

  constructor(private router: Router) { 

  }

  
  gettoken(){
    return localStorage.getItem('logintoken');
  }

  settoken(token: string, refreshtoken: string){
    localStorage.setItem(this.token, token);
    localStorage.setItem(this.refreshtoken, refreshtoken);
  }

  logout(){
    localStorage.removeItem('logintoken');
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    return !!this.gettoken();
  }

}
