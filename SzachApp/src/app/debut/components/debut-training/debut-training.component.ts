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
  gameString: string = "";
  //fileToUpload: File = null;

  handleFileInput(files: FileList) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.parsedGames = pgnParser.parse(fileReader.result);
      this.gameToString();
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

  validatePosition() {
    this.debutBoardService.validatePosition();
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
  gameToString(){
    this.gameString = "";
    let white;
    let black;
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
    this.currentGame().moves.forEach((move) => {
      if(move.move_number){
        this.gameString += `${move.move_number}. `;
      }
      this.gameString += `${move.move} `;
    });
    this.gameString += this.currentGame().result;
    console.log(this.currentGame().headers);
  }

  prevGame(){
    if(this.currentGameNumber > 0){
      this.currentGameNumber--;
      this.gameToString();
      this.debutBoardService.restart();
    }

  }

  nextGame(){
    if(this.currentGameNumber < this.parsedGames.length - 1){
      console.log(this.currentGameNumber)
      this.currentGameNumber++;
      this.gameToString();
      this.debutBoardService.restart();
    }

  }
}
