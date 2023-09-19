import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

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
      name: "",
      email: "",
      password: "",
    }
  }

  onSubmit() {
    const payload = { ...this.user };
    this._userService.create(payload).subscribe(resp => {
      this._router.navigateByUrl('/auth/login');
      this._snackBar.open("User Created.", "Success", { duration: 3000 });
    })

  }
}

