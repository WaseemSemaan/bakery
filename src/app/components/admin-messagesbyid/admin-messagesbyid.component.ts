import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-admin-messagesbyid',
  templateUrl: './admin-messagesbyid.component.html',
  styleUrls: ['./admin-messagesbyid.component.css']
})
export class AdminMessagesbyidComponent implements OnInit,OnDestroy {

  messages
  userID
  userName
  subscription: Subscription
  constructor(
    private userService: AccountService,
    private messageService: MessageService,
    private route: ActivatedRoute,) {
      this.userID = this.route.snapshot.paramMap.get('id');
      this.messages = this.messageService.getMessagesByUser(this.userID).snapshotChanges() 
   }

   ngOnInit(): void {
    this.subscription = this.userService.get(this.userID).valueChanges().subscribe(user => this.userName = user.name)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
