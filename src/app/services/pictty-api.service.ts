import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Image } from '../models/Image';

@Injectable({
  providedIn: 'root'
})

export class PicttyApiService {

  API_URI = 'http://pictty.api.io/v1/images';

  httpOptions = {
    headers: new HttpHeaders({
    })
  }

  constructor(private http: HttpClient) { }

  index(): Observable<Image[]> {
    return this.http.get<Image[]>(this.API_URI).pipe(catchError(this.errorHandler));
  }

  show(id: number): Observable<Image> {
    return this.http.get<Image>(`${this.API_URI}/${id}`).pipe(catchError(this.errorHandler));
  }

  store(image: FormData): Observable<Image> {
    return this.http.post<Image>(`${this.API_URI}/`, image, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  update(id: number, image: FormData) {
    return this.http.put(`${this.API_URI}/${id}`, image, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  delete(id: number | any) {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("_method", 'DELETE');
    return this.http.post(`${this.API_URI}/${id}`, formData, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Codigo de error: ${error.status}\nMensaje: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}