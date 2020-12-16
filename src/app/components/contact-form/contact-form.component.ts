import { AccountService } from '../../services/account.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from '../../services/message.service';



@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit,OnDestroy {
  message: any = {}
  userID: string;
  name
  userSubscription: Subscription
  accountSubscription: Subscription

  constructor(

    private accountService: AccountService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.userSubscription = this.accountService.user.subscribe(firebaseUser =>{
      this.userID = firebaseUser.uid
    } )

    this.accountSubscription = this.accountService.getAccount().subscribe(appUser =>{
      this.message.full_name = appUser.name
      this.message.email = appUser.email
    })
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe()
    this.accountSubscription.unsubscribe()
  }

  async sendMessage(){
    this.message.userID = this.userID
    let result = await this.messageService.sendMessage(this.message)
    this.router.navigate(['/my/messages']);
    return result
  
  }
}
