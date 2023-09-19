import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/internal/operators/map";
import { ResponseList } from "../models/response-list.model";
import { Observable } from "rxjs/internal/Observable";
import { Response } from "../models/response.model";
import { Project } from "../models/project.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  urlBase = "projects"

  constructor(private http: HttpClient) { }

  getAll(opts = {}): Observable<ResponseList>{
    return this.http
      .get<ResponseList>(`${this.urlBase}`, {
        params: opts,
      })
      .pipe(
        map((resp: ResponseList) => {
          return resp
        })
      );
  }

  getOne(id: String): Observable<Project> {
    return this.http
      .get<Response>(`${this.urlBase}/${id}`)
      .pipe(map((resp: Response) => resp.data));
  }

  create(payload: Project): Observable<Project>{
    return this.http
      .post<Response>(this.urlBase, payload)
      .pipe(map((resp: Response) => resp.data));
  }

  update(id: String, payload: Project): Observable<Project>  {
    return this.http
      .put<Response>(`${this.urlBase}/${id}`, payload)
      .pipe(map((resp: Response) => resp.data));
  }
  updateFields(id: String, payload: Project): Observable<Project>  {
    return this.http
      .patch<Response>(`${this.urlBase}/${id}`, payload)
      .pipe(map((resp: Response) => resp.data));
  }
  delete(id: String): Observable<Project>  {
    return this.http
      .delete<Response>(`${this.urlBase}/${id}`)
      .pipe(map((resp: Response) => resp.data));
  }
}
