import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Component({
  selector: 'app-live-stats',
  templateUrl: './live-stats.component.html',
  styleUrls: ['./live-stats.component.css']
})
export class LiveStatsComponent implements OnInit {
    stats: any;
    public number: number = 3000;
    public observable: Observable<boolean>;
    private observer: Observer<boolean>;

    constructor(private http: HttpClient) {
    }
    
    getStats() {
      let obs = this.http.get("/api/test");
      obs.subscribe(resp => { 
          const plrCounts = resp["PlayerCounts"];
          const devices = Object.keys(plrCounts);
          const plrCountsArray = [];

          devices.forEach(device => plrCountsArray.push({device, count: plrCounts[device]}));

          plrCountsArray.sort((a,b) => {return b.count - a.count});

          resp["PlayerCountsArray"] = plrCountsArray.filter(a => a.count > 0);

          this.stats = resp;
        });
    }

    ngOnInit() {
        this.getStats();
        this.observable = new Observable<boolean>((observer: any) => this.observer = observer).pipe(share());
        setInterval(() => {this.getStats();},60000);
    }
}