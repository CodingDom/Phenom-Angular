import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { Ng2OdometerModule } from 'ng2-odometer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameRecognitionComponent } from './game-recognition/game-recognition.component';
import { LiveStatsComponent } from './live-stats/live-stats.component';


@NgModule({
  declarations: [
    AppComponent,
    GameRecognitionComponent,
    LiveStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2OdometerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
