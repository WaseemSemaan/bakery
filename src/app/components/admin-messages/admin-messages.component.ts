

/**
 * this component show the admins all the messages from all accounts
 */

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.css']
})
export class AdminMessagesComponent implements OnInit{
  messages
  subscription: Subscription;
  constructor(private messageService: MessageService) {
    this.messages = this.messageService.getAll().snapshotChanges()
   }

  ngOnInit(): void { }
}
