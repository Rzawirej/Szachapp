import { BranchHistory } from './branch-history';
import { Move } from './move';
import { ParsedMove } from './parsed-move';

export class GameState {
  halfMoveNumber: number;
  currentBranch: ParsedMove[];
  currentBranchStartHalfMoveNumber: number;
  movesUndone: string[];
  branchHistory: BranchHistory[];
  lastMove: Move;
}
