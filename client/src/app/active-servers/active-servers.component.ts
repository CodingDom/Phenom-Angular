import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { preserveWhitespacesDefault } from '@angular/compiler';

import { teams } from "../logos";

@Component({
  selector: 'app-active-servers',
  templateUrl: './active-servers.component.html',
  styleUrls: ['./active-servers.component.css']
})

export class ActiveServersComponent implements OnInit {
    servers: any;
    debounce: boolean;
    cached: boolean;

    constructor(private http: HttpClient) {
    }
    
    getServers() {
      let obs = this.http.get("/api/servers");
      obs.subscribe((resp: any[]) => { 
        if (this.debounce) return;
        this.debounce = true;
          resp.sort((a,b) => {return b.PlayerCount - a.PlayerCount});
          
          if (this.cached) {
            this.servers.forEach((server: Object) => {
              for (let i = 0; i < resp.length; i++) {
                if (resp[i].Id == server["Id"]) {
                  server["Time"] = resp[i].Time;
                }
              }
            })
          } else {
            resp = resp.map(server => {
              console.log(teams[server.AwayName],server.AwayName,teams[server.HomeName],server.HomeName);
              const obj = {...server,
                AwayLogo: `https://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${teams[server.AwayName]}.png`,
                HomeLogo: `https://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${teams[server.HomeName]}.png`
              };
              return obj;
            });

            this.servers = resp;
            this.cached = true;
          }
          this.debounce = false;
        });
    }

    ngOnInit() {
        this.getServers();
        // setInterval(() => {this.getServers()},1000);
    }
}