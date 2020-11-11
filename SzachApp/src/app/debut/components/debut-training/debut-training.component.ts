import { Component, HostListener, OnInit } from '@angular/core';
import pgnParser from 'pgn-parser';
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
  parsedGames = [];
  playersString: string =""
  gameResult: string = "";
  moveArray = [];
  //fileToUpload: File = null;

  handleFileInput(files: FileList) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.parsedGames = pgnParser.parse(fileReader.result);
      this.gameToMoveArray();
    }
    fileReader.readAsText(files[0]);
  }

  uploadFileToActivity() {
    //this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
    // do something, if upload success
    //}, error => {
    //console.log(error);
    //});
  }

  ngOnInit() {
    this.debutBoardService.init("board1");
  }

  prevMove(){
    this.debutBoardService.undoMove();
  }

  nextMove(){
    this.debutBoardService.nextMove(this.currentGame());
    //this.debutBoardService.randomMove();
  }

  currentGame(){
    return this.parsedGames ? this.parsedGames[this.currentGameNumber] : null;
  }

  gameToMoveArray(){
    let white;
    let black;
    this.moveArray = [];
    console.log(this.parsedGames)
    this.currentGame().headers.forEach((header) => {
      if(header.name === "White"){
        white = header.value;
      }
      if(header.name === "Black"){
        black = header.value;
      }
    })
    this.playersString = `${white} vs ${black}\n`
    const move_info = {move_number: 1, move: undefined, color: 'white', halfMoveNumber: 1, branch_history: []};
    this.currentGame().moves.forEach((move) => {
      move_info.move=move;
      const new_move = this.constructMove(move_info);
      this.moveArray.push(new_move);
    });
    console.log(this.moveArray);
    this.gameResult = this.currentGame().result;
  }

  constructMove(move_info){

    const move = move_info.move;
    const new_move = { move: move.move, color: move_info.color, move_number: move_info.move_number, branch: [], branch_history: move_info.branch_history, halfMoveNumber: move_info.halfMoveNumber };
    if (move.ravs) {
      for (let i = 0; i < move.ravs.length; i++) {
        const branch_history = JSON.parse(JSON.stringify(new_move.branch_history));
        branch_history.push({halfMoveNumber: move_info.halfMoveNumber, rav: i});
        console.log(branch_history);
        const branch_move_info = { move_number: move_info.move_number, move: undefined, color: move_info.color, halfMoveNumber: move_info.halfMoveNumber, branch_history: branch_history };
        move.ravs[i].moves.forEach((branch_move) => {
          branch_move_info.move = branch_move;
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

  prevGame(){
    if(this.currentGameNumber > 0){
      this.currentGameNumber--;
      this.gameToMoveArray();
      this.debutBoardService.restart();
    }
  }

  nextGame(){
    if(this.currentGameNumber < this.parsedGames.length - 1){
      this.currentGameNumber++;
      this.gameToMoveArray();
      this.debutBoardService.restart();
    }
  }

  goToMove($event, move){
    $event.stopPropagation();
    console.log(move);
    this.debutBoardService.goToMove(move, this.currentGame());
  }
}
