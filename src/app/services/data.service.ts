import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, retry} from 'rxjs/operators'; 
import { Student } from '../models/student';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  base_Url = "http://localhost:3000/students";

  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.error('Error message:', error.error.message);
    } else {
      console.error(
        `Backend code ${error.status},` +
        `body contain: ${error.error}`);
    }

    return throwError(
      'Please try again later. Error occured'
    );
  };

  createItem(item: any): Observable<Student>{
    return this._http.post<Student>(this.base_Url, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  getList(): Observable<Student> {
    return this._http.get<Student>(this.base_Url).pipe(retry(2), catchError(this.handleError))
  }

  getItem(id: any): Observable<Student>{
    return this._http.get<Student>(this.base_Url + '/' + id).pipe(retry(2), catchError(this.handleError))
  }

  updateItem(id: string, item: any): Observable<Student> {
    return this._http
      .put<Student>(this.base_Url + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  deleteItem(id: string){
    return this._http
    .delete<Student>(this.base_Url + '/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}
