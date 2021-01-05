import { createReducer, on } from '@ngrx/store';
import { login, logout } from '../actions/account.action';

export const initialState = {token: localStorage.getItem('token'), nameSurname: localStorage.getItem('nameSurname')};

const _accountReducer = createReducer(
  initialState,
  on(login, () => { return {token: localStorage.getItem('token'), nameSurname: localStorage.getItem('nameSurname')}}),
  on(logout, () => { return {} }),
);

export function accountReducer(state, action) {
  return _accountReducer(state, action);
}
