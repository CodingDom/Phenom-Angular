import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { stats } from '../products';

@Component({
  selector: 'app-live-stats',
  templateUrl: './live-stats.component.html',
  styleUrls: ['./live-stats.component.css']
})
export class LiveStatsComponent implements OnInit {
    stats: any;

    constructor(private http: HttpClient) {
    }
    
    getStats() {
      let obs = this.http.get("/api/test");
      obs.subscribe(resp => { this.stats = resp; console.log(resp); });
      console.log(this.stats);
      console.log("Logged");
    }

    ngOnInit() {
        console.log("Hello world");
        this.getStats();
    }
}