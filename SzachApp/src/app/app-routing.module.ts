import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebutListComponent } from './debut/components/debut-list/debut-list.component';
import { DebutTrainingComponent } from './debut/components/debut-training/debut-training.component';
import { DebutWatchComponent } from './debut/components/debut-watch/debut-watch.component';
import { GroupAssignComponent } from './group/components/group-assign/group-assign.component';
import { GroupListComponent } from './group/components/group-list/group-list.component';
import { ParticipantAnswersComponent } from './group/components/group-participants/participant-answers/participant-answers.component';
import { ParticipantsListComponent } from './group/components/group-participants/participants-list/participants-list.component';
import { GroupPuzzlePackageAnswersComponent } from './group/components/group-puzzle-packages/group-puzzle-package-answers/group-puzzle-package-answers.component';
import { GroupPuzzlePackagesComponent } from './group/components/group-puzzle-packages/group-puzzle-packages.component';
import { CoachNewsComponent } from './news/components/coach-news/coach-news.component';
import { AddPuzzleComponent } from './puzzle/component/add-puzzle/add-puzzle.component';
import { PuzzleListComponent } from './puzzle/component/puzzle-list/puzzle-list.component';
import { PuzzleSolveComponent } from './puzzle/component/puzzle-solve/puzzle-solve.component';


const routes: Routes = [
  { path: 'debut/:debutId', component: DebutWatchComponent },
  { path: 'debut', component: DebutListComponent },
  { path: 'new-debut', component: DebutTrainingComponent },
  { path: 'news', component: CoachNewsComponent },
  { path: 'puzzles/:puzzlePackageId', component: PuzzleSolveComponent },
  { path: 'puzzles', component: PuzzleListComponent },
  { path: 'new-puzzles', component: AddPuzzleComponent},
  { path: 'participants/:groupId', component: ParticipantsListComponent},
  { path: 'group/:groupId/puzzlePackages/:puzzlePackageId', component: GroupPuzzlePackageAnswersComponent},
  { path: 'group/:groupId/puzzlePackages', component: GroupPuzzlePackagesComponent },
  { path: 'participants/:groupId/answers/:participantId', component: ParticipantAnswersComponent },
  { path: 'group-assign', component: GroupAssignComponent},
  { path: '', component: GroupListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
