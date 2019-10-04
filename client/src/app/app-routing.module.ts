import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveStatsComponent } from './live-stats/live-stats.component';

const routes: Routes = [{ path: '', component: LiveStatsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
