import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PuzzleCoachHttpService } from '../../services/puzzle-coach-http.service';

@Component({
  selector: 'app-puzzle-list',
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.css']
})
export class PuzzleListComponent implements OnInit {

  puzzles = []
  activeGroup = '';
  menuItems = [];

  constructor(private puzzleCoachHttpService: PuzzleCoachHttpService, private router: Router, private store: Store<{ activeGroup: string }>) {

  }

  ngOnInit(): void {
    this.activeGroup = localStorage.getItem('activeGroup');
    if(this.activeGroup){
      this.puzzleCoachHttpService.getGroupPuzzlePackages(this.activeGroup).subscribe((puzzlePackages) => {
        this.puzzles = puzzlePackages;
        this.transformListToSharedList();
      });
      this.menuItems = this.groupMenuItems;
    }else{
      this.puzzleCoachHttpService.getCoachPuzzlePackages().subscribe((puzzlePackages) => {
        this.puzzles = puzzlePackages;
        this.transformListToSharedList();
      });
      this.menuItems = this.coachMenuItems
    }

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

  goToPuzzlePackage = (puzzlePackage: any) => {
    const { _id } = puzzlePackage;
    this.router.navigate(['puzzles', _id]);
  }

  readonly coachMenuItems = [
    {
      description: 'Przypisz do grupy',
      handler: this.goToAssign
    },
    {
      description: 'Usuń',
      handler: this.deletePuzzlePackage
    }
  ]

  readonly groupMenuItems = [
    {
      description: 'Rozwiąż',
      handler: this.goToPuzzlePackage
    }
  ]
}
