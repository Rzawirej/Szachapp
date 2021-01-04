import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/components/login/login.component';
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
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: 'debut/:debutId', component: DebutWatchComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'debut', component: DebutListComponent, canActivate: [AuthGuard] },
  { path: 'new-debut', component: DebutTrainingComponent, canActivate: [AuthGuard] },
  { path: 'news', component: CoachNewsComponent, canActivate: [AuthGuard] },
  { path: 'puzzles/:puzzlePackageId', component: PuzzleSolveComponent, canActivate: [AuthGuard] },
  { path: 'puzzles', component: PuzzleListComponent, canActivate: [AuthGuard] },
  { path: 'new-puzzles', component: AddPuzzleComponent, canActivate: [AuthGuard]},
  { path: 'participants/:groupId', component: ParticipantsListComponent, canActivate: [AuthGuard]},
  { path: 'group/:groupId/puzzlePackages/:puzzlePackageId', component: GroupPuzzlePackageAnswersComponent, canActivate: [AuthGuard]},
  { path: 'group/:groupId/puzzlePackages', component: GroupPuzzlePackagesComponent, canActivate: [AuthGuard]},
  { path: 'participants/:groupId/answers/:participantId', component: ParticipantAnswersComponent, canActivate: [AuthGuard] },
  { path: 'group-assign', component: GroupAssignComponent, canActivate: [AuthGuard]},
  { path: '', component: GroupListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
