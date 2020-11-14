import { Component, HostListener, OnInit } from '@angular/core';
import pgnParser from 'pgn-parser';
import { Move } from '../../models/move';
import { MoveInfo } from '../../models/move-info';
import { ParsedGame } from '../../models/parsed-game';
import { ParsedMove } from '../../models/parsed-move';
import { DebutBoardService } from '../../services/debut-board.service';



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
    this.debutBoardService.resize();
  }

  title = 'szachapp';
  currentGameNumber: number = 0;
  parsedGames: ParsedGame[] = [];
  playersString: string =""
  gameResult: string = "";
  moveArray: Move[];

  ngOnInit(): void {
    this.debutBoardService.init("board1");
  }

  handleFileInput(files: FileList): void {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.parsedGames = pgnParser.parse(fileReader.result);
      this.gameToMoveArray();
    }
    fileReader.readAsText(files[0]);
  }



  prevMove(): void{
    this.debutBoardService.undoMove();
  }

  nextMove(): void{
    this.debutBoardService.nextMove(this.currentGame());
  }

  currentGame(){
    return this.parsedGames ? this.parsedGames[this.currentGameNumber] : null;
  }

  gameToMoveArray(): void{
    const players = {white: '', black: ''};
    this.moveArray = [];
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
      this.moveArray.push(new_move);
    });
    console.log(this.moveArray);
    this.gameResult = this.currentGame().result;
  }

  constructMove(move_info: MoveInfo): Move{

    const move = move_info.move;
    const new_move: Move = { move: move.move, color: move_info.color, move_number: move_info.move_number, branch: [], branch_history: move_info.branch_history, halfMoveNumber: move_info.halfMoveNumber, isBranchStart: move_info.isBranchStart };
    if (move.ravs) {
      for (let i = 0; i < move.ravs.length; i++) {
        const branch_history = JSON.parse(JSON.stringify(new_move.branch_history));
        branch_history.push({halfMoveNumber: move_info.halfMoveNumber, rav: i});
        const branch_move_info: MoveInfo = { move_number: move_info.move_number, color: move_info.color, halfMoveNumber: move_info.halfMoveNumber, branch_history: branch_history, isBranchStart: false };
        let isBranchStart = true;
        move.ravs[i].moves.forEach((branch_move) => {

          branch_move_info.move = branch_move;
          branch_move_info.isBranchStart = isBranchStart;
          isBranchStart = false;
          const new_branch_move = this.constructMove(branch_move_info);
          new_move.branch.push(new_branch_move);
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
      this.debutBoardService.restart();
    }
  }

  nextGame(): void{
    if(this.currentGameNumber < this.parsedGames.length - 1){
      this.currentGameNumber++;
      this.gameToMoveArray();
      this.debutBoardService.restart();
    }
  }

  goToMove($event, move): void{
    $event.stopPropagation();
    console.log(move);
    this.debutBoardService.goToMove(move, this.currentGame());
  }
}
