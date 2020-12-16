import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit,OnDestroy {
  orders;
  subscription: Subscription;
  constructor(private orderService: OrderService) {   }
  ngOnInit(){
    this.subscription = this.orderService.getAll()
    .subscribe(orders => {this.orders = orders.map(
      order => {
        let temp = <unknown>{ 
          key: order.key,
          value:{
            date:  order.value['date'],
            shipping: order.value['shipping'],
            price: order.value['price']
          }
        }
        return temp
      }
    )});
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}

