import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


export class ApiBaseUrlAddInterceptor implements HttpInterceptor{
  constractor(){
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const regx = /^(http|\/\/)/; //starts with http or https or //

    if (!req || !req.url || regx.test(req.url)) {
      return next.handle(req);
    }

    req = req.clone({
      url: `${environment.SERVER_API_URL}${req.url}`
    });
    return next.handle(req);
  }

}
