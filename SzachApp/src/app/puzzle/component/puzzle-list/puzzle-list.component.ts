import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PuzzleCoachHttpService } from '../../services/puzzle-coach-http.service';

@Component({
  selector: 'app-puzzle-list',
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.css']
})
export class PuzzleListComponent implements OnInit {

  puzzles = []

  constructor(private puzzleCoachHttpService: PuzzleCoachHttpService, private router: Router) { }

  ngOnInit(): void {
    this.puzzleCoachHttpService.getCoachPuzzlePackages().subscribe((puzzlePackages) => {
      this.puzzles = puzzlePackages
    });
  }

  goToAssign(id: string, name: string) {
    this.router.navigateByUrl('/group-assign', { state: { id: id, type: 'puzzle', name: name } });
  }

  deletePuzzlePackage(id: string) {
    this.puzzleCoachHttpService.deletePuzzlePackage(id).subscribe((puzzlePackage) => this.puzzles = this.puzzles.filter((value) => puzzlePackage._id !== value._id));
  }

}
