import { AppUser } from '../../models/app-user';
import { AccountService } from '../../services/account.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from '../../services/message.service';

import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {
  messageID: string
  userName: string
  accountSubscription: Subscription
  messageSubscription: Subscription
  repliesSubscription: Subscription
  userID
  appUser = <any>{};
  message = <any>{};
  replies = null;
  constructor(
    private accountService: AccountService,
    private logSerivce: LogService,
    private route: ActivatedRoute,
    private messageService: MessageService) { 

      this.messageID = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.messageSubscription = this.messageService.get(this.messageID).valueChanges().subscribe(msg => this.message = msg)
    this.accountSubscription = this.accountService.getAccount().subscribe(appUser =>{
      this.appUser = appUser;
      this.userName = appUser.name;
    } );
    this.repliesSubscription = this.messageService.getReplies(this.messageID).valueChanges().subscribe(replies => {
      if (replies.length == 0){
        this.replies = null;
      }
      else{
        this.replies = replies;

      }
    });
    

  }

  ngOnDestroy(){
    this.messageSubscription.unsubscribe();
    this.accountSubscription.unsubscribe();
    this.repliesSubscription.unsubscribe();
  }

  changeStatus(status,log){
    this.messageService.changeStatus(this.messageID , status)
    if (log){
      this.logSerivce.addLog(this.userName,'messages', ' updated reply to message  ',this.messageID, '---->' + this.message.reply);

    }
  }

  sendReply(){

    if(this.appUser.isAdmin){
      this.messageService.sendReply(this.messageID, this.message.reply, 'ADMIN')
      this.changeStatus('Answered',true)
    }
    else{
      this.messageService.sendReply(this.messageID, this.message.reply, this.userName)
      this.changeStatus('Not Answered',false)
    }
    
    
  }

}
