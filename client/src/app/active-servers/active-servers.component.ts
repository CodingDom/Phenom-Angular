import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { preserveWhitespacesDefault } from '@angular/compiler';

import { teams } from "../logos";
import { $ } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-active-servers',
  templateUrl: './active-servers.component.html',
  styleUrls: ['./active-servers.component.css']
})

export class ActiveServersComponent implements OnInit {
    serverType: string;
    servers: any;
    debounce: boolean;
    cached: boolean;

    constructor(private http: HttpClient, private toastr: ToastrService) {
    }
    
    updateList(event: Event) {
      const btn = (event.target as HTMLElement);
      const btnText = btn.innerText;
      const parentBtn = (document.querySelector(".dropdown-toggle") as HTMLElement);
      const parentText = parentBtn.innerText;
      const parentAttr = parentBtn.getAttribute("data-type");

      this.serverType = btn.getAttribute("data-type");
      btn.innerText = parentText;
      parentBtn.innerText = btnText;

      btn.setAttribute("data-type",parentAttr);
      parentBtn.setAttribute("data-type",this.serverType);
    }

    sortList() {
      this.servers.sort((a,b) => {return b.PlayerCount - a.PlayerCount});
    }

    getServers() {
      let obs = this.http.get("/api/servers");
      obs.subscribe((resp: any[]) => { 
        if (this.debounce) return;
        this.debounce = true;
          
          if (this.cached) {
            this.servers.forEach((server: Object) => {
              let notFound = false;
              for (let i = 0; i < resp.length; i++) {
                if (resp[i].Id === server["Id"]) {
                  if (resp[i].HomeName !== server["HomeName"] ) {
                    server["HomeLogo"] = `https://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${teams[resp[i].HomeName]}.png`;
                  }

                  if (resp[i].AwayName !== server["AwayName"]) {
                    server["AwayLogo"] = `https://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${teams[resp[i].AwayName]}.png`;
                  }

                  Object.keys(resp[i]).forEach(key => {
                    server[key] = resp[i][key];
                  });
                  notFound = false;
                  break;
                }
                notFound = true;
              }
              if (notFound) {
                this.toastr.error(`A ${server["Type"]} Server has been removed!`,'Server Dropped',{positionClass: "toast-bottom-right"});
                this.servers.splice(this.servers.findIndex(x => x.Id === server["Id"]), 1);
              }
            });

            resp.forEach(server => {
              if (this.servers.findIndex(x => x.Id === server["Id"]) == -1) {
                this.servers.push({
                  ...server,
                  AwayLogo: `https://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${teams[server.AwayName]}.png`,
                  HomeLogo: `https://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${teams[server.HomeName]}.png`
                });
                this.toastr.info(`A ${server["Type"]} Server has just been added`,'Server Added',{positionClass: "toast-bottom-right"});
              }
            });
            
          } else {
            resp.sort((a,b) => {return b.PlayerCount - a.PlayerCount});
            resp = resp.map(server => {
              const obj = {...server,
                AwayLogo: `https://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${teams[server.AwayName]}.png`,
                HomeLogo: `https://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${teams[server.HomeName]}.png`
              };
              return obj;
            });

            this.servers = resp;
            this.cached = true;
            this.serverType = "All";
          }
          this.debounce = false;
        });
    }

    ngOnInit() {
        this.getServers();
        setInterval(() => {this.getServers()},500);
    }
}