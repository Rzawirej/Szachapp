import { BranchHistory } from './branch-history';

export class Move {
  move: string;
  color: string;
  move_number: number;
  branch?: any[] = [];
  branch_history: BranchHistory[];
  halfMoveNumber: number;
  isBranchStart?: boolean;
  ravs?: any[] = [];
}
