import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const AUTH_API = 'http://127.0.0.1:5000/api/v1.0/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  username: any;
  password: any;
  httpOptionsBasicAuth: any;


  login(username: string, password: string): Observable<any> {

    this.username = username;
    this.password = password;

    this.httpOptionsBasicAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
      })
    };

    return this.http.get(
      AUTH_API + 'login',
      this.httpOptionsBasicAuth
    );
  }

  signup(username: string, email: string, forename: string, surname: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        forename,
        surname,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.get(AUTH_API + 'logout', { headers: { 'x-access-token': this.storageService.getUser() } });
  }
}
