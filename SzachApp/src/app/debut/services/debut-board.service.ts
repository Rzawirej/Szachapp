import { Injectable } from '@angular/core';
import Chess from "chess.js";
import { BranchHistory } from '../models/branch-history';
import { BranchInfo } from '../models/branch-info';
import { GameState } from '../models/game-state';
import { Move } from '../models/move';


@Injectable({
  providedIn: 'root'
})
export class DebutBoardService {

  game = new Chess();

  /*
  validatePosition(): void{
    console.log(this.game.load(this.board.fen() + ' w - - 0 1'))
    console.log(this.game.moves())
  }
  */

  restart(gameState: GameState): void {
    this.game = new Chess();
    gameState.halfMoveNumber = 0;
    return this.game.fen()
  }

  undoMove(gameState: GameState): [string,any]{
    const branchHistory = gameState.branchHistory;
    const branchInfo = this.prepareBranchInfo(branchHistory);
    let currentBranch = gameState.moveArray;
    if(gameState.halfMoveNumber > 0){
      gameState.halfMoveNumber--;
    }
    if(gameState.halfMoveNumber <= 0){
      this.restart(gameState);
      return ['',this.game.fen()];
    }
    for (let i = 0; i < gameState.halfMoveNumber; i++) {
      if (branchInfo.nextNumber === i) {
        currentBranch = currentBranch[branchInfo.nextNumber - branchInfo.currentNumber].branch[branchInfo.ravNumber];
        this.modifyBranchInfo(branchInfo, branchHistory);
      }
    }
    if (gameState.branchHistory.length >0 && gameState.branchHistory[gameState.branchHistory.length-1].halfMoveNumber > gameState.halfMoveNumber){
      gameState.branchHistory.pop();
    }
    this.game.undo()

    return [currentBranch[gameState.halfMoveNumber - 1 - branchInfo.currentNumber].id,this.game.fen()];
  }

  nextMove(gameState: GameState): [string, any]{
    const branchHistory = gameState.branchHistory;
    const branchInfo = this.prepareBranchInfo(branchHistory);
    let currentBranch = gameState.moveArray;
    for (let i = 0; i < gameState.halfMoveNumber; i++) {
      if (branchInfo.nextNumber === i) {
        currentBranch = currentBranch[branchInfo.nextNumber - branchInfo.currentNumber].branch[branchInfo.ravNumber];
        this.modifyBranchInfo(branchInfo, branchHistory);
      }
    }
    gameState.halfMoveNumber++;
    if (currentBranch[gameState.halfMoveNumber - 1 - branchInfo.currentNumber] ){
      gameState.currentBranch = currentBranch;
      const { move, id } = currentBranch[gameState.halfMoveNumber - 1 - branchInfo.currentNumber]
      this.game.move(move);
      return [id, this.game.fen()];
    }
    gameState.halfMoveNumber--;
    return [currentBranch[gameState.halfMoveNumber - 1 - branchInfo.currentNumber].id, this.game.fen()];


  }

  goToMove(move: Move, gameState: GameState): [string, any]{
    this.game = new Chess();
    gameState.halfMoveNumber = move.halfMoveNumber;
    const branchHistory = move.branch_history;
    const branchInfo = this.prepareBranchInfo(branchHistory)
    gameState.branchHistory = branchHistory;
    let currentBranch = gameState.moveArray;
    for (let i = 0; i < gameState.halfMoveNumber; i++){
      if (branchInfo.nextNumber === i){
        currentBranch = currentBranch[branchInfo.nextNumber - branchInfo.currentNumber].branch[branchInfo.ravNumber];
        this.modifyBranchInfo(branchInfo, branchHistory);
      }
      this.game.move(currentBranch[i - branchInfo.currentNumber].move);
    }
    gameState.currentBranch = currentBranch;

    return [move.id, this.game.fen()];
  }

  prepareBranchInfo(branchHistory: BranchHistory[]): BranchInfo{
    const branchInfo: BranchInfo = new BranchInfo();
    if (branchHistory.length > 0) {
      branchInfo.historyIter = 0;
      branchInfo.nextNumber = branchHistory[branchInfo.historyIter].halfMoveNumber - 1;
      branchInfo.ravNumber = branchHistory[branchInfo.historyIter].rav;
    }
    return branchInfo;
  }

  modifyBranchInfo(branchInfo: BranchInfo, branchHistory: BranchHistory[]){
    branchInfo.currentNumber = branchInfo.nextNumber;
    if (branchInfo.historyIter + 1 < branchHistory.length) {
      branchInfo.historyIter++;
      branchInfo.nextNumber = branchHistory[branchInfo.historyIter].halfMoveNumber - 1;
      branchInfo.ravNumber = branchHistory[branchInfo.historyIter].rav;
    }
  }
}
