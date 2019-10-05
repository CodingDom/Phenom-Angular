import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { Ng2OdometerModule } from 'ng2-odometer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameRecognitionComponent } from './game-recognition/game-recognition.component';
import { LiveStatsComponent } from './live-stats/live-stats.component';
import { ActiveServersComponent } from './active-servers/active-servers.component';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    GameRecognitionComponent,
    LiveStatsComponent,
    ActiveServersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2OdometerModule.forRoot(),
    ToastrModule.forRoot() 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
