import { Component, HostListener, OnInit } from '@angular/core';
import { Puzzle } from '../../models/puzzle.model';
import Chess from "chess.js";
import { PuzzleCoachHttpService } from '../../services/puzzle-coach-http.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var ChessBoard: any;

@Component({
  selector: 'app-puzzle-solve',
  templateUrl: './puzzle-solve.component.html',
  styleUrls: ['./puzzle-solve.component.css']
})
export class PuzzleSolveComponent implements OnInit {
  game = new Chess()
  answerBoard: any;
  moves: string[] = [];
  puzzlePackage;
  moveNumber = 0;
  puzzleNumber = 0;
  goodAnswer = true;
  color = 'white';
  puzzleEnded = false;
  allSolved = false;
  groupId = '';

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.answerBoard) {
      this.answerBoard.resize();
    }
  }

  constructor(private puzzleCoachHttpService: PuzzleCoachHttpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.groupId = localStorage.getItem('activeGroup');
    this.route.params.subscribe(params => {
      this.puzzleCoachHttpService.getPuzzlePackage(params['puzzlePackageId']).subscribe((puzzlePackage) => {
        this.puzzlePackage = puzzlePackage;
        this.puzzleCoachHttpService.getAnswersPuzzlePackage(this.groupId, this.puzzlePackage._id).subscribe((solutions) => {
          if (solutions.length === this.puzzlePackage.puzzles.length) {
            this.router.navigate(['puzzles']);
          }
          this.puzzleNumber = solutions.length;
          this.initAnswerBoard(this.puzzlePackage.puzzles[this.puzzleNumber]);
        })

      });

    });
  }

  initAnswerBoard(puzzle: Puzzle) {
    this.goodAnswer = true;
    this.puzzleEnded = false;
    this.color = puzzle.FEN.split(' ')[1] === 'w' ? 'white' : 'black';
    const config = {
      draggable: true,
      position: puzzle.FEN,
      onDragStart: this.onDragStart,
      onDrop: this.onDrop,
      onSnapEnd: this.onSnapEnd,
      orientation: this.color
    }
    this.answerBoard = ChessBoard('answer-board', config)
    this.game.load(puzzle.FEN);
  }

  blockBoard() {
    const fen = this.answerBoard.fen();
    this.puzzleEnded = true;
    const config = {
      draggable: false,
      position: fen,
      orientation: this.color
    }
    this.answerBoard = ChessBoard('answer-board', config)
  }

  onDragStart = (source, piece, position, orientation) => {
    if (this.game.game_over()) return false

    if ((this.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (this.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    }
  }

  onDrop = (source: string, target: string) => {
    const move = this.game.move({
      from: source,
      to: target,
      promotion: 'q'
    })
    if (move === null) {
      return 'snapback'
    }
    this.moves.push(move.san);
    if (move.san === this.puzzlePackage.puzzles[this.puzzleNumber].answer[this.moveNumber]){
      if (this.moveNumber >= this.puzzlePackage.puzzles[this.puzzleNumber].answer.length-1){
        this.saveAnswer();
        return move;
      }
    } else {
      this.goodAnswer = false;
      this.saveAnswer();
      return move;
    }
    this.moveNumber++;
    this.oponentMove();
    return move;
  }

  async oponentMove(){
    await new Promise(r => setTimeout(r, 400));
    this.moves.push(this.puzzlePackage.puzzles[this.puzzleNumber].answer[this.moveNumber]);
    this.game.move(this.puzzlePackage.puzzles[this.puzzleNumber].answer[this.moveNumber]);
    this.answerBoard.position(this.game.fen())
    this.moveNumber++;
  }

  saveAnswer(){
    this.blockBoard();
    this.puzzleCoachHttpService.answerPuzzle(this.groupId,this.puzzlePackage._id, this.moves, this.puzzleNumber).subscribe();
    console.log(this.puzzleNumber, this.puzzlePackage.puzzles.length - 1);
    if(this.puzzleNumber >= this.puzzlePackage.puzzles.length-1){
      this.allSolved = true;
    }

  }

  onSnapEnd = () => {
    this.answerBoard.position(this.game.fen())
  }

  nextPuzzle() {
    if (this.allSolved){
      this.router.navigate(['puzzles']);
    }
    this.puzzleNumber++;
    this.moveNumber=0;
    this.moves=[];
    this.initAnswerBoard(this.puzzlePackage.puzzles[this.puzzleNumber]);
  }

}
