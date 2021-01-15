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

  getGroupPuzzlePackages(groupId: string) {
    return this.http.get<any>('http://localhost:5000/api/groups/puzzlePackages/'+groupId);
  }

  getParticipantGroups() {
    return this.http.get<any>('http://localhost:5000/api/groups/participantGroups');
  }

  addGroup(name: string) {
    return this.http.post<any>('http://localhost:5000/api/groups', {name: name});
  }

  getParticipants(groupId: string){
    return this.http.get<any>('http://localhost:5000/api/groups/participants/' + groupId);
  }

  addParticipant(groupId: string, email: string) {
    return this.http.patch<any>('http://localhost:5000/api/groups/participants/' + groupId, { participant: email });
  }

  deleteParticipant(groupId: string, email: string){
    const params = new HttpParams().set('isDel', 'true');
    return this.http.patch<any>('http://localhost:5000/api/groups/participants/' + groupId, {participant: email}, {params});
  }

  deleteGroup(id: string) {
    return this.http.delete<any>('http://localhost:5000/api/groups/'+id);
  }

  editGroupName(groupId: string, name: string) {
    return this.http.patch<any>('http://localhost:5000/api/groups/' + groupId, { name: name });
  }

  assignToGroup(groupId: string, id: string, type: string){
    switch (type) {
      case 'news': {
        return this.http.patch<any>('http://localhost:5000/api/groups/assign-news/' + groupId, { news: id });
      }
      case 'debut': {
        console.log(groupId, id, type);
        return this.http.patch<any>('http://localhost:5000/api/groups/assign-debut/' + groupId, { debut: id });
      }
      case 'puzzle': {
        return this.http.patch<any>('http://localhost:5000/api/groups/assign-puzzle-package/' + groupId, { puzzlePackage: id });
      }
    }
  }

  unassignFromGroup(groupId: string, id: string, type: string) {
    const params = new HttpParams().set('isDel', 'true');
    switch (type) {
      case 'news': {
        return this.http.patch<any>('http://localhost:5000/api/groups/assign-news/' + groupId, { news: id }, { params });
      }
      case 'debut': {
        return this.http.patch<any>('http://localhost:5000/api/groups/assign-debut/' + groupId, { debut: id }, { params });
      }
      case 'puzzle': {
        return this.http.patch<any>('http://localhost:5000/api/groups/assign-puzzle-package/' + groupId, { puzzlePackage: id }, { params });
      }
    }
  }

  getGroupsByAssigned(type: string, id: string){
    let params: HttpParams;
    switch (type) {
      case 'news': {
        params = new HttpParams().set('newsId', id);
        break;
      }
      case 'debut': {
        params = new HttpParams().set('debutId', id);
        break;
      }
      case 'puzzle': {
        params = new HttpParams().set('puzzlePackageId', id);
        break;
      }
    }
    return this.http.get<any>('http://localhost:5000/api/groups', {params});
  }

  getParticipantAnswers(groupId: string, participantId: string){
    return this.http.get<any>('http://localhost:5000/api/groups/participants/'+groupId+'/answers/'+participantId);
  }

  getPuzzlePackageAnswers(groupId: string, puzzlePackageId: string){
    return this.http.get<any>('http://localhost:5000/api/groups/'+groupId+'/answer-puzzle-package/'+puzzlePackageId);
  }

  leaveGroup(groupId: string){
    return this.http.patch<any>('http://localhost:5000/api/groups/leave/'+groupId, {});
  }
}
