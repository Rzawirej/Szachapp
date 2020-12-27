import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DebutTrainingComponent } from './debut/components/debut-training/debut-training.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { CoachNewsComponent, NewNewsDialog } from './news/components/coach-news/coach-news.component';
import { PlayerNewsComponent } from './news/components/player-news/player-news.component';
import { DebutListComponent } from './debut/components/debut-list/debut-list.component';
import { PuzzleListComponent } from './puzzle/component/puzzle-list/puzzle-list.component';
import { EditGroupDialog, GroupListComponent, NewGroupDialog } from './group/components/group-list/group-list.component';
import { AddPuzzleComponent, EndPuzzlesDialog, NamePuzzlesDialog } from './puzzle/component/add-puzzle/add-puzzle.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/token.interceptor';
import { AddParticipantDialog, ParticipantsListComponent } from './group/components/group-participants/participants-list/participants-list.component';
import { GroupAssignComponent } from './group/components/group-assign/group-assign.component';

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
    GroupAssignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
