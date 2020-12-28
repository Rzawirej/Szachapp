import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Debut } from '../models/debut';

@Injectable({
  providedIn: 'root'
})
export class DebutCoachHttpService {

  constructor(private http: HttpClient) { }

  getDebuts(){
    return this.http.get<any>('http://localhost:5000/api/debuts');
  }

  saveDebut(debut: Debut){
    return this.http.post<any>('http://localhost:5000/api/debuts', debut);
  }

  deleteDebut(debutId: string) {
    return this.http.delete<any>('http://localhost:5000/api/debuts/'+debutId);
  }

}
