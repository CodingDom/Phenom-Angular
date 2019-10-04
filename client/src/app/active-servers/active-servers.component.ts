import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Component({
  selector: 'app-active-servers',
  templateUrl: './active-servers.component.html',
  styleUrls: ['./active-servers.component.css']
})
export class ActiveServersComponent implements OnInit {
    servers: any;

    constructor(private http: HttpClient) {
    }
    
    getServers() {
      let obs = this.http.get("/api/servers");
      obs.subscribe((resp: any[]) => { 
          resp.sort((a,b) => {return b.PlayerCount - a.PlayerCount});
          this.servers = resp;
        });
    }

    ngOnInit() {
        this.getServers();
    }
}