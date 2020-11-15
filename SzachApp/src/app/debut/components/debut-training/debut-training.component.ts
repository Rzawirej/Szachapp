import { Component, HostListener, OnInit } from '@angular/core';
import pgnParser from 'pgn-parser';
import { GameState } from '../../models/game-state';
import { Move } from '../../models/move';
import { MoveInfo } from '../../models/move-info';
import { ParsedGame } from '../../models/parsed-game';
import { ParsedMove } from '../../models/parsed-move';
import { DebutBoardService } from '../../services/debut-board.service';
declare var ChessBoard: any;


@Component({
  selector: 'app-debut-training',
  templateUrl: './debut-training.component.html',
  providers: [DebutBoardService]
})
export class DebutTrainingComponent implements OnInit {

  constructor(private debutBoardService: DebutBoardService){

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.board.resize();
  }

  board: any;
  currentGameNumber = 0;
  playersString = '';
  gameResult = '';
  highlight = '';
  parsedGames: ParsedGame[] = [];
  gameState: GameState;
  ngOnInit(): void {
    const config = {
      draggable: false,
      position: 'start',
    }
    this.board = ChessBoard('board1', config)
    this.board.resize();
    this.initGameState();
  }

  initGameState(): void{
    this.gameState = {
      halfMoveNumber: 0,
      currentBranch: [],
      branchHistory: [],
      moveArray: []
    }
  }

  handleFileInput(files: FileList): void {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.parsedGames = pgnParser.parse(fileReader.result);
      this.gameToMoveArray();
    }
    fileReader.readAsText(files[0]);
  }

  prevMove(): void{
    const [highlightId, fen] = this.debutBoardService.undoMove(this.gameState);
    this.highlight = highlightId;
    this.board.position(fen);
  }

  nextMove(): void{
    const [highlightId, fen] = this.debutBoardService.nextMove(this.gameState);
    this.highlight = highlightId;
    this.board.position(fen);
  }

  goToMove($event, move: Move): void {
    $event.stopPropagation();

    const [highlightId, fen] = this.debutBoardService.goToMove(move, this.gameState);
    this.highlight = highlightId;
    this.board.position(fen);
  }

  gameToMoveArray(): void{
    const players = {white: '', black: ''};
    this.initGameState();
    this.gameState.moveArray = [];
    this.currentGame().headers.forEach((header) => {
      if(header.name === "White"){
        players.white = header.value;
      }
      if(header.name === "Black"){
        players.black = header.value;
      }
    })
    this.playersString = `${players.white} vs ${players.black}\n`
    const move_info: MoveInfo = {move_number: 1, move: undefined, color: 'white', halfMoveNumber: 1, branch_history: []};
    this.currentGame().moves.forEach((move: ParsedMove) => {
      move_info.move=move;
      const new_move: Move = this.constructMove(move_info);
      new_move.id=this.makeId(new_move);
      this.gameState.moveArray.push(new_move);
    });
    this.gameResult = this.currentGame().result;
  }

  makeId(move: Move): string{
    let id: string = move.halfMoveNumber+'.';
    move.branch_history.forEach((historyObject) => {
      id+=historyObject.halfMoveNumber+'.'+historyObject.rav+'.';
    })
    return id;
  }

  constructMove(move_info: MoveInfo): Move{
    const move = move_info.move;
    const new_move: Move = { move: move.move, color: move_info.color, move_number: move_info.move_number, branch: [], branch_history: move_info.branch_history, halfMoveNumber: move_info.halfMoveNumber, isBranchStart: move_info.isBranchStart };
    if (move.ravs) {
      for (let i = 0; i < move.ravs.length; i++) {
        new_move.branch.push([]);
        const branch_history = JSON.parse(JSON.stringify(new_move.branch_history));
        branch_history.push({halfMoveNumber: move_info.halfMoveNumber, rav: i});
        const branch_move_info: MoveInfo = { move_number: move_info.move_number, color: move_info.color, halfMoveNumber: move_info.halfMoveNumber, branch_history: branch_history, isBranchStart: false };
        let isBranchStart = true;
        move.ravs[i].moves.forEach((branch_move) => {

          branch_move_info.move = branch_move;
          branch_move_info.isBranchStart = isBranchStart;
          isBranchStart = false;
          const new_branch_move = this.constructMove(branch_move_info);
          new_branch_move.id = this.makeId(new_branch_move);
          new_move.branch[i].push(new_branch_move);
        });
      }
    }
    if (move_info.color === 'black') {
      move_info.move_number++;
    }
    move_info.halfMoveNumber++;
    move_info.color = move_info.color === 'white' ? 'black' : 'white';
    return new_move;
  }

  prevGame(): void{
    if(this.currentGameNumber > 0){
      this.currentGameNumber--;
      this.gameToMoveArray();
      const fen = this.debutBoardService.restart(this.gameState);
      this.board.position(fen);
      this.highlight = '';
    }
  }

  currentGame(): ParsedGame {
    return this.parsedGames ? this.parsedGames[this.currentGameNumber] : null;
  }

  nextGame(): void{
    if(this.currentGameNumber < this.parsedGames.length - 1){
      this.currentGameNumber++;
      this.gameToMoveArray();
      const fen = this.debutBoardService.restart(this.gameState);
      this.board.position(fen);
      this.highlight = '';
    }
  }


}
