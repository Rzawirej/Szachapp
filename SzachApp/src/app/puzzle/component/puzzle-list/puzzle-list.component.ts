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
      this.puzzles = puzzlePackages;
      this.transformListToSharedList();
    });
  }

  transformListToSharedList() {
    for (let i = 0; i < this.puzzles.length; i++) {
      this.transformItemToSharedListItem(this.puzzles[i]);
    }
  }

  transformItemToSharedListItem(item: any) {
    item.icon = 'check';
    item.mainInfo = item.name;
    item.secondaryInfo = item.puzzles.length;
    return item;
  }

  goToAssign = (puzzlePackage: any) => {
    const { _id, name } = puzzlePackage;
    this.router.navigateByUrl('/group-assign', { state: { id: _id, type: 'puzzle', name: name } });
  }

  deletePuzzlePackage = (puzzlePackage: any) => {
    const { _id } = puzzlePackage;
    this.puzzleCoachHttpService.deletePuzzlePackage(_id).subscribe((puzzlePackage) => this.puzzles = this.puzzles.filter((value) => puzzlePackage._id !== value._id));
  }

  readonly menuItems = [
    {
      description: 'Przypisz do grupy',
      handler: this.goToAssign
    },
    {
      description: 'Usuń',
      handler: this.deletePuzzlePackage
    }
  ]
}
