import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Chess from "chess.js";
import { GroupCoachHttpService } from 'src/app/group/services/group-coach-http.service';
import { PuzzleCoachHttpService } from 'src/app/puzzle/services/puzzle-coach-http.service';
declare var ChessBoard: any;

@Component({
  selector: 'app-group-puzzle-package-answers',
  templateUrl: './group-puzzle-package-answers.component.html',
  styleUrls: ['./group-puzzle-package-answers.component.css']
})
export class GroupPuzzlePackageAnswersComponent implements OnInit {

  game = new Chess()
  board: any;
  whiteOrientation = true;
  puzzlePackage: any;
  solutions = [];
  participants = [];
  puzzleNumber = 0;
  list = [];

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.board) {
      this.board.resize();
    }

  }

  constructor(
    private puzzleCoachHttpService: PuzzleCoachHttpService,
    private groupCoachHttpService: GroupCoachHttpService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.puzzleCoachHttpService.getPuzzlePackage(params['puzzlePackageId']).subscribe((puzzlePackage) => {
        this.puzzlePackage = puzzlePackage;
        this.groupCoachHttpService.getPuzzlePackageAnswers(params['groupId'], params['puzzlePackageId']).subscribe((response) => {
          this.solutions = response;
          this.groupCoachHttpService.getParticipants(params['groupId']).subscribe((response) =>{
            this.participants = response.participants;
            for (let i = 0; i < this.participants.length; i++) {
              const solutionData = this.solutions.find((solution) => solution.participant === this.participants[i]._id)
              this.participants[i].solutions = solutionData ? solutionData.solutions : [];
            }
            this.prepareList();

          });
          this.initBoard(this.puzzlePackage.puzzles[this.puzzleNumber].FEN);
        })
      });;
    });
  }

  prepareList(){
    this.list = [];
    for (let i = 0; i < this.participants.length; i++) {
      const mainInfo = this.participants[i].name+' '+this.participants[i].surname;
      const secondaryInfo = this.solutionToString(this.participants[i].solutions[this.puzzleNumber]);
      let icon = '';
      if (JSON.stringify(this.participants[i].solutions[this.puzzleNumber]) === JSON.stringify(this.puzzlePackage.puzzles[this.puzzleNumber].answer)){
        icon = 'check';
      }else{
        icon = 'error';
      }
      this.list.push({mainInfo, secondaryInfo, icon})
    }
  }

  solutionToString(solution: any[]): string{
    if(!solution || solution.length === 0){
      return 'BRAK';
    }
    let isWhiteMove = true;
    let solutionString = '1.';
    if(!this.whiteOrientation){
      solutionString += '..';
      isWhiteMove = false;
    }
    solutionString += ' ' + solution[0];
    isWhiteMove = !isWhiteMove;
    for(let i = 1; i < solution.length; i++){
      if(isWhiteMove){
        solutionString+=' '+Math.floor(((i+1)/2)+1)+'.';
      }
      solutionString+=' '+solution[i];
      isWhiteMove = !isWhiteMove;
    }
    return solutionString;
  }

  initBoard(fen: string) {
    this.whiteOrientation = fen.split(' ')[1] === 'w';
    const config = {
      draggable: true,
      position: fen,
      onDragStart: this.onDragStart,
      onDrop: this.onDrop,
      onSnapEnd: this.onSnapEnd,
      orientation: this.whiteOrientation ? 'white' : 'black'
    };
    this.board = ChessBoard('answer-board', config);
    this.game.load(fen);
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
  }

  onSnapEnd = () => {
    this.board.position(this.game.fen())
  }

  prevMove() {
    this.game.undo();
    this.board.position(this.game.fen());
  }

  prevPuzzle() {
    if(this.puzzleNumber > 0){
      this.puzzleNumber--;
      this.initBoard(this.puzzlePackage.puzzles[this.puzzleNumber].FEN);
      this.prepareList();
    }
  }

  nextPuzzle() {
    if(this.puzzleNumber + 1 < this.puzzlePackage.puzzles.length){
      this.puzzleNumber++;
      this.initBoard(this.puzzlePackage.puzzles[this.puzzleNumber].FEN);
      this.prepareList();
    }
  }
}
