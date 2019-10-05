import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Component({
  selector: 'app-game-recognition',
  templateUrl: './game-recognition.component.html',
  styleUrls: ['./game-recognition.component.css']
})
export class GameRecognitionComponent implements OnInit {
    stats: any;
    public observable: Observable<boolean>;
    private observer: Observer<boolean>;

    constructor(private http: HttpClient) {
    }
    
    getStats() {
      let obs = this.http.get("/api/gameinfo");
      obs.subscribe(resp => { 
          this.stats = {Plays: resp["visits"]};
        });
    }

    ngOnInit() {
        this.getStats();
        setInterval(() => {this.getStats();},20000);
    }
}