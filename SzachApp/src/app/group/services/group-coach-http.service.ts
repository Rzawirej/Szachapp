import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupCoachHttpService {

  constructor(private http: HttpClient) { }

  getCoachGroups() {
    return this.http.get<any>('http://localhost:5000/api/groups');
  }

  addGroup(name: string) {
    return this.http.post<any>('http://localhost:5000/api/groups', {name: name});
  }

  getParticipants(groupId: string){
    return this.http.get<any>('http://localhost:5000/api/groups/participants/' + groupId);
  }

  addParticipant(groupId: string, email: string) {
    return this.http.put<any>('http://localhost:5000/api/groups/participants/' + groupId, { participant: email });
  }

  deleteParticipant(groupId: string, email: string){
    const params = new HttpParams().set('isDel', 'true');
    return this.http.put<any>('http://localhost:5000/api/groups/participants/' + groupId, {participant: email}, {params});
  }

  deleteGroup(id: string) {
    return this.http.delete<any>('http://localhost:5000/api/groups/'+id);
  }

  editGroupName(groupId: string, name: string) {
    console.log('a');
    return this.http.put<any>('http://localhost:5000/api/groups/' + groupId, { name: name });
  }
}
