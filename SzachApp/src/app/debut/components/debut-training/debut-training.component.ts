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

  fileToUpload: File = null;

  handleFileInput(files: FileList) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      const result = pgnParser.parse(fileReader.result);
      console.log(result[0].moves);
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




}
