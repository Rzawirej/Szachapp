import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsCoachHttpService {

  constructor(private http: HttpClient) { }

  getCoachNews() {
    return this.http.get<any>('http://localhost:5000/api/news');
  }

  addNews(name: string, text: string) {
    return this.http.post<any>('http://localhost:5000/api/news', { name: name, text: text });
  }

  deleteNews(id: string) {
    return this.http.delete<any>('http://localhost:5000/api/news/' + id);
  }
}
