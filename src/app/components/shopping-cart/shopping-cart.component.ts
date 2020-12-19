/**
 * this component shows all the items in the shopping cart
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { AppUser } from '../../models/app-user';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy{
  @Input('cart') cart: any;
  @Input('mode') mode: string;
  @Input('cartID') cartID: string;


  appUser= <AppUser>{
    points: 0
  };
  canUsePoints = true
  price
  pointsPrice = 0
  usedPoints = 0
  items
  points = 0
  user
  subscription: Subscription;

  constructor(
    private userService: AccountService,
    private cartService: ShoppingCartService
  ){
    
  }

  ngOnInit(){

    this.subscription = this.userService.getAccount().subscribe(appUser =>{
      this.appUser = appUser
      if(appUser){
        this.points = this.appUser.points
      }

    } )

    this.items = this.cartService.getItems(this.cartID).valueChanges()

    this.cart = this.cart || {};
    this.price = this.cart.totalPrice    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  usePoints(){
    this.canUsePoints = false
    if (this.price > this.points){
      
      this.usedPoints = this.points
      this.price = this.price - this.points
      this.userService.setUsedPoints(this.points)
      this.pointsPrice = -1 * this.points
      this.points = 0
      

    }

    else{
      this.pointsPrice = -(this.price/Math.ceil(this.price))*Math.ceil(this.price)
      this.points -= Math.ceil(this.price)
      this.usedPoints = Math.ceil(this.price)
      this.userService.setUsedPoints(Math.ceil(this.price))
      this.price = 0
      
     }


  }

}
