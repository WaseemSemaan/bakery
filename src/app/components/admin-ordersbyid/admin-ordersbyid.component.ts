
/**
 * this component shows the admins orders placed by sepcific account by ID
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-admin-ordersbyid',
  templateUrl: './admin-ordersbyid.component.html',
  styleUrls: ['./admin-ordersbyid.component.css']
})
export class AdminOrdersbyidComponent implements OnInit,OnDestroy {

  orders
  userID
  userName
  subscription: Subscription
  constructor(
    private accountService: AccountService,
    private orderService: OrderService,
    private route: ActivatedRoute,) {
      this.userID = this.route.snapshot.paramMap.get('id');
      this.orders = this.orderService.getOrdersByUser(this.userID).snapshotChanges()
   }

  ngOnInit(): void {
      this.subscription = this.accountService.get(this.userID).valueChanges().subscribe(user => this.userName = user.name)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
