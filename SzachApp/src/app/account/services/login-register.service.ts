import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:5000/api/accounts/login', {email, password});
  }

  register(name: string, surname: string, email: string, password: string) {
    return this.http.post<any>('http://localhost:5000/api/accounts', {name, surname, email, password });
  }
}
