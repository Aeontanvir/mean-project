import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  currentUser: any = {};
  constructor(private _authService: AuthService){}

  ngOnInit(): void {
    this.currentUser = this._authService.getUser();
  }

  onLogoutClick() {

    this._authService.logout();
  }
}
