import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Component({
  selector: 'app-live-stats',
  templateUrl: './live-stats.component.html',
  styleUrls: ['./live-stats.component.css']
})
export class LiveStatsComponent implements OnInit,OnDestroy {
    interval: any;
    stats: any;
    public observable: Observable<boolean>;
    private observer: Observer<boolean>;

    constructor(private http: HttpClient) {
    }
    
    getStats() {
      let obs = this.http.get("/api/livestats");
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
        this.interval = setInterval(() => {this.getStats();},60000);
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }
}