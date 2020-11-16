import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebutTrainingComponent } from './debut/components/debut-training/debut-training.component';


const routes: Routes = [
  { path: 'debut', component: DebutTrainingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
