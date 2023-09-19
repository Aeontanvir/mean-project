import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any = {};

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _userService: UserService,
  ) {
  }

  public ngOnInit(): void {
    this.buildObject()
  }

  buildObject() {
    this.user = {
      email: "",
      password: "",
    }
  }

  onSubmit() {
    const payload = { ...this.user };
    this._userService.login(payload).subscribe((resp: any) => {
      window.localStorage[environment.LOCAL_STORAGE_USER] = JSON.stringify(resp);
      window.localStorage[environment.LOCAL_STORAGE_TOKEN] = resp.token;
      this._router.navigate(['admin']);
    }, error => {
      this._snackBar.open(error.error.message, "Error", { duration: 3000 });
    })

  }
}

