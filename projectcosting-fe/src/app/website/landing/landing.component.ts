import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit{
  currentUser: any = {};
  isLoggedIn: boolean = false;
  constructor(private _authService: AuthService){}
  ngOnInit(): void {
    this.isLoggedIn = this._authService.isLoggedIn();
    this.currentUser = this._authService.getUser();
  }


}
