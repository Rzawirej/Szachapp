import { createReducer, on } from '@ngrx/store';
import { save, remove } from '../actions/active-group.action';

export const initialState = localStorage.getItem('activeGroup');

const _activeGroupReducer = createReducer(
  initialState,
  on(save, () => localStorage.getItem('activeGroup')),
  on(remove, () => {return {}}),
);

export function activeGroupReducer(state, action) {
  return _activeGroupReducer(state, action);
}
