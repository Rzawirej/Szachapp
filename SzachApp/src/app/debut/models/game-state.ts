import { BranchHistory } from './branch-history';
import { Move } from './move';

export class GameState {
  halfMoveNumber: number;
  currentBranch: Move[];
  branchHistory: BranchHistory[];
  moveArray: Move[];
}
