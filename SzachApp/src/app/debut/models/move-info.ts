import { BranchHistory } from './branch-history';
import { Move } from './move';
import { ParsedMove } from './parsed-move';

export class MoveInfo {
  move_number: number;
  move?: ParsedMove;
  color: string;
  halfMoveNumber: number;
  branch_history: BranchHistory[]
  isBranchStart?: boolean;
}
