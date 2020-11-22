import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DebutTrainingComponent } from './debut/components/debut-training/debut-training.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { CoachNewsComponent } from './news/components/coach-news/coach-news.component';
import { PlayerNewsComponent } from './news/components/player-news/player-news.component';
import { DebutListComponent } from './debut/components/debut-list/debut-list.component';
import { PuzzleListComponent } from './puzzle/component/puzzle-list/puzzle-list.component';
import { GroupListComponent } from './group/components/group-list/group-list.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
