import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-szachapp-list',
  templateUrl: './szachapp-list.component.html',
  styleUrls: ['./szachapp-list.component.css']
})
export class SzachappListComponent implements OnInit {

  @Input()
  items: any[];
  @Input()
  menuItems: any[];
  @Input()
  mainInfoLabel: string;
  @Input()
  secondaryInfoLabel: string;
  constructor() { }

  ngOnInit(): void {

  }

}
