import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveStatsComponent } from './live-stats/live-stats.component';
import { GameRecognitionComponent } from './game-recognition/game-recognition.component';

const routes: Routes = [{ path: '', component: GameRecognitionComponent },{ path: '', component: LiveStatsComponent, outlet:'secondary' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
