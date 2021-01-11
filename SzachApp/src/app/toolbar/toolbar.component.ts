import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from '../store/actions/account.action';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

  activeGroup$: Observable<string>;
  account$: Observable<any>
  groupName = '';
  token = '';
  nameSurname = '';

  constructor(private store: Store<any>, private router: Router) {
    this.activeGroup$ = store.select('activeGroup');
    this.account$ = store.select('account');
  }

  ngOnInit(): void {
    this.activeGroup$.subscribe(() => this.groupName = localStorage.getItem('activeGroupName'));
    this.account$.subscribe((data) => {this.token=data.token; this.nameSurname = data.nameSurname});
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nameSurname');
    localStorage.removeItem('activeGroup');
    localStorage.removeItem('activeGroupName');
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }

}
