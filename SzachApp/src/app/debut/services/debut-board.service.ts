import { Injectable } from '@angular/core';
import Chess from "chess.js";
import { BranchInfo } from '../models/branch-info';
import { GameState } from '../models/game-state';
import { Move } from '../models/move';
import { ParsedGame } from '../models/parsed-game';
import { ParsedMove } from '../models/parsed-move';
declare var ChessBoard: any;

@Injectable({
  providedIn: 'root'
})
export class DebutBoardService {
  board: any;
  game = new Chess();

  init(boardId: string): void{
    const config = {
      draggable: false,
      position: 'start',
    }
    this.board = ChessBoard(boardId, config)
  }

  /*
  validatePosition(): void{
    console.log(this.game.load(this.board.fen() + ' w - - 0 1'))
    console.log(this.game.moves())
  }
  */

  resize(): void{
    this.board.resize();
  }

  /*
  randomMove(): void{
    const moves = this.game.moves()
    const move = moves[Math.floor(Math.random() * moves.length)]
    this.game.move(move)
    this.board.position(this.game.fen());
  }
  */

  undoMove(gameState: GameState): void{
    this.board.position(this.game.fen());
    if (gameState.halfMoveNumber > 0){
      gameState.halfMoveNumber--;
    }
  }

  nextMove(parsedGame: ParsedGame, gameState: GameState): void{
    console.log(gameState.lastMove.id);
    if(!parsedGame){
      return;
    }
    const branchInfo: BranchInfo = {
      nextNumber: -1,
      currentNumber: 0,
      historyIter: -1,
      ravNumber: -1
    }
    if (gameState.branchHistory.length > 0) {
      gameState.branchHistory = gameState.branchHistory;
      branchInfo.historyIter = 0;
      branchInfo.nextNumber = gameState.branchHistory[branchInfo.historyIter].halfMoveNumber - 1;
      branchInfo.ravNumber = gameState.branchHistory[branchInfo.historyIter].rav;
    }
    let currentBranch = parsedGame.moves;
    for (let i = 0; i < gameState.halfMoveNumber; i++) {
      if (branchInfo.nextNumber === i) {
        currentBranch = currentBranch[branchInfo.nextNumber - branchInfo.currentNumber].ravs[branchInfo.ravNumber].moves;
        branchInfo.currentNumber = branchInfo.nextNumber;
        if (branchInfo.historyIter + 1 < gameState.branchHistory.length) {
          branchInfo.historyIter++;
          branchInfo.nextNumber = gameState.branchHistory[branchInfo.historyIter].halfMoveNumber - 1;
          branchInfo.ravNumber = gameState.branchHistory[branchInfo.historyIter].rav;
        }
      }
    }
    this.game.move(currentBranch[gameState.halfMoveNumber - branchInfo.currentNumber].move);
    this.board.position(this.game.fen());
    gameState.halfMoveNumber++;

  }

  restart(gameState: GameState): void{
    this.game = new Chess();
    this.board.position(this.game.fen());
    gameState.halfMoveNumber = 0;
  }

  goToMove(move: Move, parsedGame: ParsedGame, gameState: GameState): void{
    this.game = new Chess();
    gameState.halfMoveNumber = move.halfMoveNumber;
    const branchInfo: BranchInfo = {
      nextNumber: -1,
      currentNumber: 0,
      historyIter: -1,
      ravNumber: -1
    }
    if(move.branch_history.length > 0){
      gameState.branchHistory = move.branch_history;
      branchInfo.historyIter = 0;
      branchInfo.nextNumber = move.branch_history[branchInfo.historyIter].halfMoveNumber-1;
      branchInfo.ravNumber = move.branch_history[branchInfo.historyIter].rav;
    }
    let currentBranch = parsedGame.moves;
    for (let i = 0; i < gameState.halfMoveNumber; i++){
      if (branchInfo.nextNumber === i){
        currentBranch = currentBranch[branchInfo.nextNumber - branchInfo.currentNumber].ravs[branchInfo.ravNumber].moves;
        branchInfo.currentNumber = branchInfo.nextNumber;
        if (branchInfo.historyIter + 1 < move.branch_history.length){
          branchInfo.historyIter++;
          branchInfo.nextNumber = move.branch_history[branchInfo.historyIter].halfMoveNumber-1;
          branchInfo.ravNumber = move.branch_history[branchInfo.historyIter].rav;
        }
      }
      this.game.move(currentBranch[i - branchInfo.currentNumber].move);
    }
    gameState.currentBranchStartHalfMoveNumber = branchInfo.currentNumber;
    gameState.currentBranch = currentBranch;
    this.board.position(this.game.fen());
  }
}
