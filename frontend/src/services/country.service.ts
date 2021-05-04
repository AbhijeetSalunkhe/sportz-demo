import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/internal/operators';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  readonly rootUrl = 'http://127.0.0.1:8080/api/v1/';
  constructor(private http:HttpClient) { }

  addCountry(country): Observable<Country>{
    return this.http.post(this.rootUrl+'country',country).pipe(
      catchError(this.handleError<any>('addCountry')));
  }
  
  getCountries() : Observable<any>{
    return this.http.get(this.rootUrl+'countries').pipe(
    catchError(this.handleError<any>('getCountries')));
  }

  getCountry(id:string): Observable<any> {
    return this.http.get(this.rootUrl+'country/'+id).pipe(
      catchError(this.handleError<any>('getCountry')));;
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if(error.statusText == "Unauthorized"){
        // localStorage.removeItem('token');
        return of(result as T);
      }
    };
  }
}
