import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from '../shared/store/actions/account.action';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

  activeGroup$: Observable<string>;
  account$: Observable<string>
  groupName = '';
  token = '';

  constructor(private store: Store<any>, private router: Router) {
    this.activeGroup$ = store.select('activeGroup');
    this.account$ = store.select('account');
  }

  ngOnInit(): void {
    this.activeGroup$.subscribe(() => this.groupName = localStorage.getItem('activeGroupName'));
    this.account$.subscribe((token) => this.token=token);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('activeGroup');
    localStorage.removeItem('activeGroupName');
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }

}
