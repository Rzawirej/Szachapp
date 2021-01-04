import { createReducer, on } from '@ngrx/store';
import { login, logout } from '../actions/account.action';

export const initialState = localStorage.getItem('token');

const _accountReducer = createReducer(
  initialState,
  on(login, () => localStorage.getItem('token')),
  on(logout, () => { return '' }),
);

export function accountReducer(state, action) {
  return _accountReducer(state, action);
}
