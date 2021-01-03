import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupCoachHttpService } from 'src/app/group/services/group-coach-http.service';
import { PuzzleCoachHttpService } from 'src/app/puzzle/services/puzzle-coach-http.service';

@Component({
  selector: 'app-participant-answers',
  templateUrl: './participant-answers.component.html',
  styleUrls: ['./participant-answers.component.css']
})
export class ParticipantAnswersComponent implements OnInit {

  answers = [];
  puzzlePackages = [];
  participant = ''
  participantId = ''
  constructor(
    private route: ActivatedRoute,
    private groupCoachHttpService: GroupCoachHttpService,
    private puzzleCoachHttpService: PuzzleCoachHttpService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.participantId = params[this.participantId];
      this.puzzleCoachHttpService.getGroupPuzzlePackages(params['groupId']).subscribe((puzzlePackages) => {
        this.puzzlePackages = puzzlePackages;
        this.groupCoachHttpService.getParticipantAnswers(params['groupId'], params['participantId']).subscribe((answers) => {
          this.answers = answers.answers;
          this.participant = answers.participant;
          this.transformListToSharedList();
        });
      });;
    });
  }

  transformListToSharedList() {
    for (let i = 0; i < this.puzzlePackages.length; i++) {
      this.transformItemToSharedListItem(this.puzzlePackages[i]);
    }
  }

  transformItemToSharedListItem(item: any) {

    const indexOfAnswer = this.answers.findIndex((answer) => {
      return answer.puzzlePackage == item._id;
    })

    item.mainInfo = item.name;

    if(indexOfAnswer === -1){
      item.icon = 'error';
      item.secondaryInfo = '0/' + item.puzzles.length + ' Dobrze: 0/'+item.puzzles.length;;
      return item;
    }

    let goodAnswers = 0;
    for(let i = 0; i < this.answers[indexOfAnswer].solutions.length; i++){
      if (JSON.stringify(this.answers[indexOfAnswer].solutions[i]) === JSON.stringify(item.puzzles[i].answer)){
        goodAnswers++;
      }
    }
    if (this.answers[indexOfAnswer].solutions.length === item.puzzles.length){
      item.icon = 'check';
    }else{
      item.icon = 'error';
    }

    item.secondaryInfo = this.answers[indexOfAnswer].solutions.length+'/'+item.puzzles.length+' Dobrze: '+goodAnswers+'/'+item.puzzles.length;
    return item;
  }

  readonly menuItems = [];

}
