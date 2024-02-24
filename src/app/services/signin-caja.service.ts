import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SigninCajaService {
  API_URI = 'https://crepas-cash-users-proyect-api.onrender.com/auth'
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    // Realiza la solicitud HTTP para iniciar sesión y recibir el token
    return this.http.post<any>((this.API_URI)+ '/signin', { username, password })
      .pipe(
        tap(response => {
          if (response.token) {
            // Almacena el token en LocalStorage
            localStorage.setItem('token', response.token);
            console.log(response.token);
          }
        }),
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // Error del servidor
      console.error(
        `El servidor devolvió el código ${error.status}, ` +
        `el cuerpo del error fue: ${error.error}`);
    }
    // Devuelve un observable con un mensaje de error orientado al usuario
    return throwError(error);
  }

  changelang( newLang: string): Observable<any> {
    return this.http.post<any>((this.API_URI)+ '/changeLang', {newLang})      
    .pipe(
      tap(response => {
        if (response.token) {
          // Almacena el token en LocalStorage
          localStorage.setItem('token', response.token);
          console.log(response.token);
        }
      }),
      catchError(this.handleError)
    );
  }

}
