import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebutListComponent } from './debut/components/debut-list/debut-list.component';
import { DebutTrainingComponent } from './debut/components/debut-training/debut-training.component';
import { CoachNewsComponent } from './news/components/coach-news/coach-news.component';
import { PuzzleListComponent } from './puzzle/component/puzzle-list/puzzle-list.component';


const routes: Routes = [
  { path: 'debut', component: DebutListComponent },
  { path: 'new-debut', component: DebutTrainingComponent },
  { path: 'news', component: CoachNewsComponent },
  { path: 'puzzles', component: PuzzleListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
