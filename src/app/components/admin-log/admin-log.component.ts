import { Component, OnInit } from '@angular/core';

import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-admin-log',
  templateUrl: './admin-log.component.html',
  styleUrls: ['./admin-log.component.css']
})
export class AdminLogComponent implements OnInit {
  logs
  constructor(private logService: LogService) { 
  }

  ngOnInit(): void {
    this.logs = this.logService.getLogs().valueChanges()
  }

}
