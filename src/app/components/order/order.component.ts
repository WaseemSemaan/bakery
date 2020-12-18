import { AccountService } from './../../services/account.service';
import { LogService } from 'src/app/services/log.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  id: string
  orderSubscription: Subscription
  accountSubscription
  items
  userName
  points
  orderStatus
  pointsPrice
  order = <any>{
    shipping: {}
  }
  constructor(
    private router: Router,
    private logService: LogService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private orderService: OrderService) { 
      this.id = this.route.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.orderSubscription = this.orderService.get(this.id).subscribe(p =>{
      this.order = p.payload.val()
      this.points = p.payload.val()['usedPoints']
      this.orderStatus = p.payload.val()['status']
      this.pointsPrice = this.points > this.order['price'] ? this.order['price'] : this.points
    } )
    this.accountSubscription = this.accountService.getAccount().subscribe(appUser => {
      this.userName = appUser.name
    })
    this.items = this.orderService.getItems(this.id).valueChanges()

    if (this.points > this.order.price ){
      this.pointsPrice = this.order.price
    }

    



  }

  ngOnDestroy(){
    this.orderSubscription.unsubscribe()
  }

  markAsFulfilled(){
    this.logService.addLog(this.userName, 'orders', 'fulfilled order: ', this.id, '' )
    this.orderService.changeStatus(this.id,'Fulfilled')
  }

}
