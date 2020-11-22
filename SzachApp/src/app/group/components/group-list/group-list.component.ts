import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  groups = [{ name: 'PON 15.15', code: "A32SZ43Z" },
    { name: 'ŚR 15.15', code: "DS23SA43" },
    { name: 'PT 17', code: "GFW21SA2" },
    { name: 'PT 16', code: "CZXSFD43" }]

  constructor() { }

  ngOnInit(): void {
  }

}
