import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  subscription: Subscription
  items
  points
  pointsPrice
  order = <any>{
    shipping: {}
  }
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService) { 
      this.id = this.route.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.subscription = this.orderService.get(this.id).pipe(take(1)).subscribe(p =>{
      this.order = p.payload.val()
      this.points = p.payload.val()['usedPoints']
      this.pointsPrice = this.points > this.order['price'] ? this.order['price'] : this.points
    } )
    this.items = this.orderService.getItems(this.id).valueChanges()

    if (this.points > this.order.price ){
      this.pointsPrice = this.order.price
    }

    



  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
