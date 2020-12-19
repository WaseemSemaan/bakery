
/**
 * this service implements the functionality of messages which access the database
 */

import { Subscription } from 'rxjs';
import { AccountService } from './account.service';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class LogService{
  activity = <any>{}
  userID: string
  subscription: Subscription
  constructor(
    private db: AngularFireDatabase) { }


  async addLog(username,type,act1,componentID = '',act2 = ''){
    this.activity.date = new Date().getTime()
    this.activity.act1 = act1
    this.activity.act2 = act2
    this.activity.username = username
    this.activity.componentID = componentID
    this.activity.type = type
    let result = await this.db.list('/admin-logs').push(this.activity)
    return result
  }

  getLogs(){

    return this.db.list('/admin-logs');
  }

}
