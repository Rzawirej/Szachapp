import { Injectable } from '@angular/core';
import Chess from "chess.js";
declare var ChessBoard: any;

@Injectable({
  providedIn: 'root'
})
export class DebutBoardService {
  board: any;
  game = new Chess();
  halfMoveNumber: number = 0;

  init(id: string){
    const config = {
      draggable: false,
      position: 'start',
      onDragStart: this.onDragStart,
      onDrop: this.onDrop,
      onSnapEnd: this.onSnapEnd
    }
    this.board = ChessBoard(id, config)
  }
  onDragStart = (source, piece, position, orientation) => {
    if (this.game.game_over()) return false
    if (piece.search(new RegExp('^' + this.game.turn())) === -1) return false
  }

  onDrop = (source: string, target: string) => {
    let move = this.game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })

    if (move === null) return 'snapback'
  }

  onSnapEnd = () => {
    //need in case of castling and enpassant
    this.board.position(this.game.fen());
  }
  validatePosition() {
    console.log(this.game.load(this.board.fen() + ' w - - 0 1'))
    console.log(this.game.moves())
  }
  resize(){
    this.board.resize();
  }

  randomMove(){
    const moves = this.game.moves()
    const move = moves[Math.floor(Math.random() * moves.length)]
    this.game.move(move)
    this.board.position(this.game.fen());
  }

  undoMove(){
    this.game.undo()
    this.board.position(this.game.fen());
    if(this.halfMoveNumber>0){
      this.halfMoveNumber--;
    }
  }

  nextMove(parsedGame){
    if(!parsedGame){
      return;
    }
    if (this.halfMoveNumber < parsedGame.moves.length){
      this.game.move(parsedGame.moves[this.halfMoveNumber].move)
      this.board.position(this.game.fen());
      this.halfMoveNumber++;
    }
  }

  restart(){
    this.game = new Chess();
    this.board.position(this.game.fen());
    this.halfMoveNumber = 0;
  }

  goToMove(move, parsedGame){
    this.game = new Chess();
    this.halfMoveNumber = move.halfMoveNumber;
    let branchHistoryNumber = -1;
    let branchHistoryIter = -1;
    let branchHistoryRav = -1;
    if(move.branch_history.length > 0){
      branchHistoryIter = 0;
      branchHistoryNumber = move.branch_history[branchHistoryIter].halfMoveNumber;
      branchHistoryRav = move.branch_history[branchHistoryIter].rav;
    }

    for(let i = 0; i < this.halfMoveNumber; i++){
      if (branchHistoryNumber-1 === i){
        if (branchHistoryIter + 1 < move.branch_history.length){
          branchHistoryIter++;
          branchHistoryNumber = move.branch_history[branchHistoryIter].halfMoveNumber;
          branchHistoryRav = move.branch_history[branchHistoryIter].rav;
        }
      }
      if (branchHistoryNumber !== -1 && branchHistoryNumber-1 <= i){
        this.game.move(parsedGame.moves[branchHistoryNumber - 1].ravs[branchHistoryRav].moves[i - branchHistoryNumber + 1].move)
      }else{
        this.game.move(parsedGame.moves[i].move)
      }

    }
    this.board.position(this.game.fen());
  }
}
