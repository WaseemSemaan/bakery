/**
 * this component is the navigaiton bar 
 */

import { AccountService } from '../../services/account.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppUser } from '../../models/app-user';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy{
  appUser: AppUser;
  subscription: Subscription;

  constructor(
    private router: Router,
    private accountService: AccountService) { 
  }

  ngOnInit(){
    this.subscription = this.accountService.getAccount().subscribe(appUser =>{
      this.appUser = appUser

    } )   
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  logout() {
    this.router.navigate(['/'])
    this.accountService.logout();
    this.appUser = null
  }

  login(){
    this.accountService.login(); 
  }

  contact(){
    if(this.appUser){
      this.router.navigate(['/contact-form'])
    }
    else{
      window.alert('You have to login first')
    }
  }

}
