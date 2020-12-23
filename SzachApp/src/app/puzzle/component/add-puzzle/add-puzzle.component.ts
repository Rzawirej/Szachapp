import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Chess from "chess.js";
import { Puzzle } from '../../models/puzzle.model';
import { PuzzleCoachHttpService } from '../../services/puzzle-coach-http.service';
declare var ChessBoard: any;

@Component({
  selector: 'app-add-puzzle',
  templateUrl: './add-puzzle.component.html',
  styleUrls: ['./add-puzzle.component.css']
})
export class AddPuzzleComponent implements OnInit {

  positionBoard: any;
  game = new Chess()
  answerBoard: any;
  isLegal = true;
  isPositionVisible = true;
  moves: string[] = [];
  puzzles: Puzzle[] = [];
  startingFen = '';
  whiteOrientation = true;
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.positionBoard) {
      this.positionBoard.resize();
    }

  }

  constructor(public dialog: MatDialog, private router: Router, private puzzleCoachHttpService: PuzzleCoachHttpService) { }

  ngOnInit(): void {
    setTimeout(() => this.initPositionBoard(''), 0);
  }

  initPositionBoard(fen: string){
    const config = {
      draggable: true,
      dropOffBoard: 'trash',
      sparePieces: true,
      position: fen,
      orientation: this.whiteOrientation?'white':'black'
    };
    this.positionBoard = ChessBoard('position-board', config)
  }

  initAnswerBoard(fen: string) {
    const config = {
      draggable: true,
      position: fen,
      onDragStart: this.onDragStart,
      onDrop: this.onDrop,
      onSnapEnd: this.onSnapEnd,
      orientation: this.whiteOrientation ? 'white' : 'black'
    }
    this.answerBoard = ChessBoard('answer-board', config)
    const color = this.whiteOrientation ? 'w' : 'b'
    this.startingFen = fen + ' ' + color + ' - - 1 45';
    this.game.load(this.startingFen);
  }

  goToAnswer(): void {
    const fen = this.positionBoard.fen();
    this.isLegal = this.isPositionLegal(fen)
    if(this.isLegal){

      this.isPositionVisible = false;
      setTimeout(() => this.initAnswerBoard(fen), 0);
    }
  }

  returnToPosition(){
    this.isPositionVisible = true;
    setTimeout(() => this.initPositionBoard(this.answerBoard.fen()), 0);
    this.moves = [];
  }

  private isPositionLegal(fen: string): boolean{
    let foundWhiteKing = false;
    let foundBlackKing = false;
    for(let i=0;i<fen.length;i++){
      if(fen[i] === 'k'){
        if(foundWhiteKing){
          return false;
        }
        foundWhiteKing = true;
      }
      if (fen[i] === 'K') {
        if (foundBlackKing) {
          return false;
        }
        foundBlackKing = true;
      }
    }
    return foundBlackKing && foundWhiteKing;
  }

  prevMove(){
    this.game.undo();
    this.answerBoard.position(this.game.fen());
    this.moves.pop();
  }

  flipBoard(){
    this.whiteOrientation = !this.whiteOrientation;
    this.positionBoard.flip();
  }

  nextPuzzle(){
    if (this.moves.length > 0) {
      const dialogRef = this.dialog.open(EndPuzzlesDialog);
      dialogRef.afterClosed().subscribe(end => {
        if(end !== undefined){
          this.puzzles.push({FEN: this.startingFen, answer: this.moves})
          if (end) {
            const dialogRef = this.dialog.open(NamePuzzlesDialog);
            dialogRef.afterClosed().subscribe(name => {
              if(name){
                this.puzzleCoachHttpService.addPuzzlePackage(name,this.puzzles).subscribe(() => {
                  this.router.navigateByUrl('/puzzles');
                });

              }
            })
          } else {
            this.moves = [];
            this.isPositionVisible = true;
            setTimeout(() => this.initPositionBoard(''), 0);
          }
        }
      });
    }
  }

  onDragStart = (source, piece, position, orientation) =>{
    if (this.game.game_over()) return false

    if ((this.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (this.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    }
  }

  onDrop = (source: string, target: string)  => {
    const move = this.game.move({
      from: source,
      to: target,
      promotion: 'q'
    })
    if (move === null) {
      return 'snapback'
    }
    this.moves.push(move.san);
  }

  onSnapEnd = () => {
    this.answerBoard.position(this.game.fen())
  }

}

@Component({
  selector: 'end-puzzles-dialog',
  templateUrl: 'end-puzzles-dialog.html',
})
export class EndPuzzlesDialog {
  constructor(
    public dialogRef: MatDialogRef<AddPuzzleComponent>) {}
}

@Component({
  selector: 'name-puzzles-dialog',
  templateUrl: 'name-puzzles-dialog.html',
})
export class NamePuzzlesDialog {
  constructor(
    public dialogRef: MatDialogRef<AddPuzzleComponent>) { }
  name = '';
}
