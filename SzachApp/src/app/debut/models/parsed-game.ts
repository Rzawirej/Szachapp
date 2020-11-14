import { ParsedMove } from './parsed-move';

export class ParsedGame {
  comments?: any[];
  comments_above_header?: any[];
  headers?: any[];
  moves: ParsedMove[];
  result: string;
}
