import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { activeGroupReducer } from './shared/store/reducers/active-group.reducer';
import { accountReducer } from './shared/store/reducers/account.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DebutTrainingComponent } from './debut/components/debut-training/debut-training.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { CoachNewsComponent, NewNewsDialog } from './news/components/coach-news/coach-news.component';
import { PlayerNewsComponent } from './news/components/player-news/player-news.component';
import { DebutListComponent } from './debut/components/debut-list/debut-list.component';
import { PuzzleListComponent } from './puzzle/component/puzzle-list/puzzle-list.component';
import { EditGroupDialog, GroupListComponent, NewGroupDialog } from './group/components/group-list/group-list.component';
import { AddPuzzleComponent, EndPuzzlesDialog, NamePuzzlesDialog } from './puzzle/component/add-puzzle/add-puzzle.component';
import { AuthInterceptor } from './auth/token.interceptor';
import { AddParticipantDialog, ParticipantsListComponent } from './group/components/group-participants/participants-list/participants-list.component';
import { GroupAssignComponent } from './group/components/group-assign/group-assign.component';
import { SzachappListComponent } from './shared/components/szachapp-list/szachapp-list.component';
import { DebutWatchComponent } from './debut/components/debut-watch/debut-watch.component';
import { PuzzleSolveComponent } from './puzzle/component/puzzle-solve/puzzle-solve.component';
import { ParticipantAnswersComponent } from './group/components/group-participants/participant-answers/participant-answers.component';
import { GroupPuzzlePackagesComponent } from './group/components/group-puzzle-packages/group-puzzle-packages.component';
import { GroupPuzzlePackageAnswersComponent } from './group/components/group-puzzle-packages/group-puzzle-package-answers/group-puzzle-package-answers.component';
import { LoginComponent } from './account/components/login/login.component';
import { RegisterComponent } from './account/components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    DebutTrainingComponent,
    ToolbarComponent,
    CoachNewsComponent,
    PlayerNewsComponent,
    DebutListComponent,
    PuzzleListComponent,
    GroupListComponent,
    AddPuzzleComponent,
    EndPuzzlesDialog,
    NamePuzzlesDialog,
    NewNewsDialog,
    NewGroupDialog,
    EditGroupDialog,
    AddParticipantDialog,
    ParticipantsListComponent,
    GroupAssignComponent,
    SzachappListComponent,
    DebutWatchComponent,
    PuzzleSolveComponent,
    ParticipantAnswersComponent,
    GroupPuzzlePackagesComponent,
    GroupPuzzlePackageAnswersComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ activeGroup: activeGroupReducer, account: accountReducer }),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
