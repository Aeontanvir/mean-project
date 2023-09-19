import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthService } from "./services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MESSAGE } from "./app.constants";

@Injectable()
export class AccessTokenExpiration implements HttpInterceptor {
  constructor(
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => { }, (error: any) => {

      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this._authService.logout();
          setTimeout(() => {
            this._snackBar.open(MESSAGE.SESSION_EXPIRED, "Error", { duration: 5000 });
          });
        }
      }
    }));
  }

}

