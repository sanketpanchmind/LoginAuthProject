import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userflag: boolean = false;
  constructor() {

  }
  role: string = '';

  ngOnInit() {
    const userObj = localStorage.getItem('currentuser');
    if (userObj) {
      const parsedUser = JSON.parse(userObj);
      this.role = parsedUser.role; // Set role from localStorage
    }

    if (this.role) {
      // You can use this.role here for conditionals
      console.log('User role:', this.role);
    }
  }

}
