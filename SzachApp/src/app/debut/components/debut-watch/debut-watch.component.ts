import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Debut } from '../../models/debut';
import { GameState } from '../../models/game-state';
import { Move } from '../../models/move';
import { MoveInfo } from '../../models/move-info';
import { ParsedGame } from '../../models/parsed-game';
import { ParsedMove } from '../../models/parsed-move';
import { DebutBoardService } from '../../services/debut-board.service';
import { DebutCoachHttpService } from '../../services/debut-coach-http.service';

declare var ChessBoard: any;

@Component({
  selector: 'app-debut-watch',
  templateUrl: './debut-watch.component.html',
  styleUrls: ['./debut-watch.component.css']
})
export class DebutWatchComponent implements OnInit {

  board: any;
  currentGameNumber = 0;
  playersString = '';
  gameResult = '';
  highlight = '';
  gameState: GameState;
  debut: Debut;

  constructor(
    private debutBoardService: DebutBoardService,
    private debutCoachHttpService: DebutCoachHttpService,
    private route: ActivatedRoute
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.board) {
      this.board.resize();
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'ArrowRight') {
      this.nextMove();
    }
    if (event.key == 'ArrowLeft') {
      this.prevMove();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.debutCoachHttpService.getDebut(params['debutId']).subscribe((debut) => {
        this.debut=debut;
        this.gameToMoveArray();
      });
    });
    this.initGameState();
    this.initChessboard();
  }

  private initGameState(): void {
    this.gameState = {
      halfMoveNumber: 0,
      currentBranch: [],
      branchHistory: [],
      moveArray: []
    }
    this.debutBoardService.restart(this.gameState);
  }

  private initChessboard() {
    const config = {
      draggable: false,
      position: 'start',
    }
    this.board = ChessBoard('debut-board', config)
  }

  prevMove(): void {
    const [highlightId, fen] = this.debutBoardService.undoMove(this.gameState);
    this.highlight = highlightId;
    this.board.position(fen);
  }

  nextMove(): void {
    const [highlightId, fen] = this.debutBoardService.nextMove(this.gameState);
    this.highlight = highlightId;
    this.board.position(fen);
  }

  goToMove($event, move: Move): void {
    $event.stopPropagation();

    const [highlightId, fen] = this.debutBoardService.goToMove(move, this.gameState);
    this.highlight = highlightId;
    console.log(fen);
    this.board.position(fen);
  }

  private gameToMoveArray(): void {
    const players = { white: '', black: '' };
    this.initGameState();
    this.gameState.moveArray = [];
    this.getCurrentGame().headers.forEach((header) => {
      if (header.name === "White") {
        players.white = header.value;
      }
      if (header.name === "Black") {
        players.black = header.value;
      }
    })
    this.playersString = `${players.white} vs ${players.black}\n`
    const move_info: MoveInfo = { move_number: 1, move: undefined, color: 'white', halfMoveNumber: 1, branch_history: [] };
    this.getCurrentGame().moves.forEach((move: ParsedMove) => {
      move_info.move = move;
      const new_move: Move = this.constructMove(move_info);
      new_move.id = this.makeId(new_move);
      this.gameState.moveArray.push(new_move);
    });
    this.gameResult = this.getCurrentGame().result;
  }

  private makeId(move: Move): string {
    let id: string = move.halfMoveNumber + '.';
    move.branch_history.forEach((historyObject) => {
      id += historyObject.halfMoveNumber + '.' + historyObject.rav + '.';
    })
    return id;
  }

  private constructMove(move_info: MoveInfo): Move {
    const move = move_info.move;
    const new_move: Move = { move: move.move, color: move_info.color, move_number: move_info.move_number, branch: [], branch_history: move_info.branch_history, halfMoveNumber: move_info.halfMoveNumber, isBranchStart: move_info.isBranchStart };
    if (move.ravs) {
      for (let i = 0; i < move.ravs.length; i++) {
        new_move.branch.push([]);
        const branch_history = JSON.parse(JSON.stringify(new_move.branch_history));
        branch_history.push({ halfMoveNumber: move_info.halfMoveNumber, rav: i });
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

  goToPrevGame(): void {
    if (this.currentGameNumber > 0) {
      this.currentGameNumber--;
      this.gameToMoveArray();
      const fen = this.debutBoardService.restart(this.gameState);
      this.board.position(fen);
      this.highlight = '';
    }
  }

  goToNextGame(): void {
    if (this.currentGameNumber < this.debut.pgn.length - 1) {
      this.currentGameNumber++;
      this.gameToMoveArray();
      const fen = this.debutBoardService.restart(this.gameState);
      this.board.position(fen);
      this.highlight = '';
    }
  }

  private getCurrentGame(): ParsedGame {
    return this.debut.pgn ? this.debut.pgn[this.currentGameNumber] : null;
  }
}
