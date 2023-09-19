import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = window.localStorage.getItem(environment.LOCAL_STORAGE_TOKEN);
    const isAuthenticated = !!token;

    if (!isAuthenticated) {
      const navigationExtras: NavigationExtras = {
        queryParams: { returnUrl: this.router.routerState.snapshot.url },
      };

      this.router.navigate(['/auth/login'], navigationExtras);
    }

    return isAuthenticated;
  }
}
