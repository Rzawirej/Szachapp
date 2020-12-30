import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

  activeGroup$: Observable<string>;
  groupName = '';

  constructor(private store: Store<{ activeGroup: string }>) {
    this.activeGroup$ = store.select('activeGroup');
  }

  ngOnInit(): void {
    this.activeGroup$.subscribe(() => this.groupName = localStorage.getItem('activeGroupName'))
  }

}
