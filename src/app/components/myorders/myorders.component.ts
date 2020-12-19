
/**
 * this component shows the user all of his orders
 */

import { AccountService } from '../../services/account.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit, OnDestroy {
  orders;
  userID;
  subscription: Subscription;
  constructor(
    private accountSubscription: AccountService,
    private orderService: OrderService) {}

  ngOnInit(){

    this.subscription = this.accountSubscription.user.subscribe(user => {
      this.userID = user.uid
      this.orders = this.orderService.getOrdersByUser(user.uid).snapshotChanges();
    })
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

