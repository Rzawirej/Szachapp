import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Puzzle } from '../models/puzzle.model';

@Injectable({
  providedIn: 'root'
})
export class PuzzleCoachHttpService {

  constructor(private http: HttpClient) { }

  getCoachPuzzlePackages() {
    return this.http.get<any>('http://localhost:5000/api/puzzle-packages');
  }

  addPuzzlePackage(name: string, puzzles: Puzzle[]) {
    return this.http.post<any>('http://localhost:5000/api/puzzle-packages', { name: name, puzzles: puzzles });
  }

  deletePuzzlePackage(id: string) {
    return this.http.delete<any>('http://localhost:5000/api/puzzle-packages/' + id);
  }
}
