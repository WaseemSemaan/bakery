
/**
 * this component shows the user all of his messages
 */

import { AccountService } from '../../services/account.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-mymessages',
  templateUrl: './mymessages.component.html',
  styleUrls: ['./mymessages.component.css'],
  animations: [
    trigger('fade',[
      transition('void => *',[
        style({ opacity:0}),
        animate(2000)
      ])
    ])
  ]
})
export class MymessagesComponent implements OnInit, OnDestroy {
  messages;
  userID;
  subscription: Subscription;
  constructor(
    private messageService: MessageService,
    private accountService: AccountService) {      
     }
 
  ngOnInit(): void {

    this.subscription = this.accountService.user.subscribe(firebaseUser => {
      this.userID = firebaseUser.uid
      this.messages = this.messageService.getMessagesByUser(firebaseUser.uid).snapshotChanges()
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
