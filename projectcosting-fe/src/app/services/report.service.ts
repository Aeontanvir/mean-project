import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ResponseList } from '../models/response-list.model';
import { Response } from '../models/response.model';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  url = "reports"

  constructor(private http: HttpClient) { }

  getLastProject(): Observable<ResponseList> {
    return this.http
      .get<ResponseList>(`${this.url}/last-project`)
      .pipe(
        map((resp: ResponseList) => {
          return resp
        })
      );
  }
  getLastCost(): Observable<ResponseList> {
    return this.http
      .get<ResponseList>(`${this.url}/last-cost`)
      .pipe(
        map((resp: ResponseList) => {
          return resp
        })
      );
  }

  getProjectCount(opts = {}): Observable<Response> {
    return this.http
      .get<Response>(`${this.url}/project-count`, {
        params: opts,
      })
      .pipe(
        map((resp: Response) => {
          return resp;
        })
      );
  }
  getCostCount(opts = {}): Observable<Response> {
    return this.http
      .get<Response>(`${this.url}/cost-count`, {
        params: opts,
      })
      .pipe(
        map((resp: Response) => {
          return resp
        })
      );
  }

}
