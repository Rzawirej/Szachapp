import { Injectable } from '@angular/core';
import Chess from "chess.js";
declare var ChessBoard: any;

@Injectable({
  providedIn: 'root'
})
export class DebutBoardService {
  board: any;
  game = new Chess();

  constructor(){

  }

  init(id: string){
    const config = {
      draggable: true,
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
}
