import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebutTrainingComponent } from './debut/components/debut-training/debut-training.component';
import { CoachNewsComponent } from './news/components/coach-news/coach-news.component';


const routes: Routes = [
  { path: 'debut', component: DebutTrainingComponent },
  { path: 'news', component: CoachNewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
