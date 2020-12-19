/**
 * this component serves as admin view for all the accounts
 * 
 */

import { LogService } from './../../services/log.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-admin-accounts',
  templateUrl: './admin-accounts.component.html',
  styleUrls: ['./admin-accounts.component.css']
})
export class AdminAccountsComponent implements OnInit, OnDestroy {
  accounts;
  accountSubscription: Subscription
  isAdmin
  userName
  constructor(
    private logService: LogService,
    private router: Router,
    private accountService: AccountService) { 
    this.accounts = this.accountService.getAll().snapshotChanges()

  }
  ngOnInit(): void {
    this.accountSubscription = this.accountService.getAccount().subscribe(appUser =>{
      this.userName = appUser.name

      if (!appUser.isAdmin){

        this.router.navigate(['/'])

      }
    } )

  }

  ngOnDestroy(){
    this.accountSubscription.unsubscribe()
  }

  makeAdmin(accountID,accountName){
    this.logService.addLog(this.userName, 'admin status', 'changed ' + accountName + "'s status to Admin")
    this.accountService.makeAdmin(accountID)
  }

  removeAdmin(accountID, accountName){
    
    this.logService.addLog(this.userName, 'admin status', 'changed ' + accountName + "'s status to normal account")
    this.accountService.removeAdmin(accountID)
  }

}
