
/**
 * this service implements the functionality of orders which access the database
 */

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/internal/operators/map';

import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private cartService: ShoppingCartService,
    private db: AngularFireDatabase) { }

  async placeOrder(order) { 
    let result = await this.db.list('/orders').push(order);

    localStorage.setItem('orderID',result.key)
    let cartID = localStorage.getItem('cartId')
    this.cartService.clear(cartID);
    return result;
  }

  get(orderID){
    return this.db.object('/orders/' + orderID).snapshotChanges();
  }

  getItems(orderID){
    return this.db.list('/orders/' + orderID + '/items/');
  }

  getAll() {

    return this.db.list('/orders').snapshotChanges().pipe( 
      map(orders => orders.map(order => ({
        key: order.payload.key,
        value: order.payload.val()
      })))
    );

  }
  
  getOrdersByUser(userId: string) {

    return this.db.list('/orders', ref => ref.orderByChild('userID').equalTo(userId));
  }
  changeStatus(orderID,status){
    this.db.object('/orders/' + orderID).update({status: status})
  }
}
