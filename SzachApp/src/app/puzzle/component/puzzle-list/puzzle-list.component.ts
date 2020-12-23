import { Component, OnInit } from '@angular/core';
import { PuzzleCoachHttpService } from '../../services/puzzle-coach-http.service';

@Component({
  selector: 'app-puzzle-list',
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.css']
})
export class PuzzleListComponent implements OnInit {

  puzzles = []

  constructor(private puzzleCoachHttpService: PuzzleCoachHttpService) { }

  ngOnInit(): void {
    this.puzzleCoachHttpService.getCoachPuzzlePackages().subscribe((puzzlePackages) => {
      this.puzzles = puzzlePackages
    });
  }

  deletePuzzlePackage(id: string) {
    this.puzzleCoachHttpService.deletePuzzlePackage(id).subscribe((puzzlePackage) => this.puzzles = this.puzzles.filter((value) => puzzlePackage._id !== value._id));
  }

}
