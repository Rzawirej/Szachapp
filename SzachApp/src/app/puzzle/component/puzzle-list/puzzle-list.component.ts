import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-puzzle-list',
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.css']
})
export class PuzzleListComponent implements OnInit {

  puzzles = [{ name: 'Związania', quantity: 3 },
    { name: 'Maty w 2', quantity: 12 },
    { name: 'Końcówki', quantity: 5 },
    { name: 'Maty', quantity: 4 }]

  constructor() { }

  ngOnInit(): void {
  }

}
