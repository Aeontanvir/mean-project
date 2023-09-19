import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/internal/operators/map";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlBase = "users"

  constructor(private http: HttpClient) { }

  getAll(opts = {}) {
    return this.http
      .get(`${this.urlBase}`, {
        params: opts,
      })
      .pipe(
        map((resp: any) => {
          return resp.data
        })
      );
  }

  getOne(id: String) {
    return this.http
      .get(`${this.urlBase}/${id}`)
      .pipe(map((resp: any) => resp.data));
  }

  create(payload: any) {
    return this.http
      .post(this.urlBase, payload)
      .pipe(map((resp: any) => resp.data));
  }

  update(id: String, payload: any) {
    return this.http
      .put(`${this.urlBase}/${id}`, payload)
      .pipe(map((resp: any) => resp.data));
  }

  delete(id: String) {
    return this.http
      .delete(`${this.urlBase}/${id}`)
      .pipe(map((resp: any) => resp.data));
  }


  login(payload: any) {
    return this.http
      .post(`${this.urlBase}/login`, payload)
      .pipe(map((resp: any) => resp.data));
  }

  logout() {
    return this.http
      .post(`${this.urlBase}/logout`, {})
      .pipe(map((resp: any) => resp.data));
  }
}
