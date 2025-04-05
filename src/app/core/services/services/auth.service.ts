import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private token = 'currentuser';
  private refreshtoken = 'refreshtoken';

  private user = {
    role: 'admin'
  }

  constructor(private router: Router) {

  }


  gettoken() {
    return localStorage.getItem('currentuser');
  }
  getUserrole() {
    return this.user.role;
  }
  isloggedIn() {
    return !this.user;
  }

  settoken(token: string) {
    localStorage.setItem(this.token, token);
    // localStorage.setItem(this.refreshtoken, refreshtoken);
  }

  logout() {
    localStorage.removeItem('currentuser');
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    return !!this.gettoken();
  }

}
