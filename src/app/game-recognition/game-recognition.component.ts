import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-game-recognition',
  templateUrl: './game-recognition.component.html',
  styleUrls: ['./game-recognition.component.css']
})

export class GameRecognitionComponent implements OnInit {
    stats: any;
    public observable: Observable<boolean>;
    private observer: Observer<boolean>;
    // @Input() loaded: boolean;

    constructor(private http: HttpClient, private spinner: NgxSpinnerService) {
    }
    
    getStats() {
      let obs = this.http.get("/api/gameinfo");
      obs.subscribe(resp => { 
          this.stats = {Plays: resp["visits"]};
        });
    }

    ngOnInit() {
        this.spinner.show();
        this.getStats();
        setInterval(() => {this.getStats();},20000);
        setTimeout(() => {this.spinner.hide()},1500);
    }
}