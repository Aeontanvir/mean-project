import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedinUser: any = {};
  constructor(
    private router: Router,
    private _userService: UserService,
  ) {
    this.getUser();
  }

  getUser() {
    const userString = window.localStorage[environment.LOCAL_STORAGE_USER];
    if (userString) {
      this.loggedinUser = JSON.parse(userString);
    }
    return this.loggedinUser;
  }
  isLoggedIn() {
    return window.localStorage[environment.LOCAL_STORAGE_TOKEN];
  }

  logout() {
    this._userService.logout().subscribe(data => {
      console.log('Logout Backend!');
    }).add(() => {
      console.log('Logout!');
      window.localStorage.removeItem(environment.LOCAL_STORAGE_USER);
      window.localStorage.removeItem(environment.LOCAL_STORAGE_TOKEN);
      this.router.navigate(['public']);
    });;
  }
}
