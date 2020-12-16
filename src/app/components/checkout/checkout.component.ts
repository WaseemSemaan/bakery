import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppUser } from '../../models/app-user';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { AccountService } from '../../services/account.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit,OnDestroy{

  shipping: any = {};
  userPoints: number
  totalPrice: number
  cart;
  appUser = <AppUser>{};
  accountSubscription: Subscription
  userSubscription: Subscription
  cartSubscription: Subscription
  mode: string
  cartID
  userID
  constructor(
    private http: HttpClient,
    private router: Router,
    private accountService: AccountService,
    private orderService: OrderService,
    private cartService: ShoppingCartService) {
      this.mode = "checkout"
      this.cartID = localStorage.getItem('cartId')
      
    }

  async ngOnInit() {
    this.accountService.setUsedPoints(0);
    this.cartSubscription = this.cartService.getCart(this.cartID).valueChanges().subscribe(cart => this.cart = cart)
    
    this.accountSubscription = this.accountService.getAccount().subscribe(appUser =>{
      this.appUser = appUser
      this.shipping.name = appUser.name
    } )
    this.userSubscription = this.accountService.user.subscribe(firebaseUser =>{
      this.userID = firebaseUser.uid 

    })
  }


  async placeOrder() {

    let newOrder = {
      date: new Date().getTime(),
      items: this.cart.items,
      shipping: this.shipping,
      price: this.cart.totalPrice,
      userID: this.userID,
      usedPoints: this.accountService.getUsedPoints()
    }

    
    let usedPoints = this.accountService.getUsedPoints();
        
    newOrder.price = newOrder.price - usedPoints
    if (newOrder.price < 0){
      newOrder.price = 0
    }
    this.totalPrice = newOrder.price
    if ( this.appUser.points){ this.userPoints = this.appUser.points }
    else{
      this.userPoints = 0
    }
   

    let result = await this.orderService.placeOrder(newOrder);

    this.router.navigate(['/my/orders', result.key]);


    this.accountService.user.subscribe(user => {
       this.accountService.updatePoints(user, Math.floor(this.userPoints - usedPoints + this.totalPrice/10))
     })

    this.accountService.setUsedPoints(0) 


  }  

  ngOnDestroy(){
    this.accountSubscription.unsubscribe()
    this.userSubscription.unsubscribe()
    this.cartSubscription.unsubscribe()
  }

  getLocation(){
    if(!navigator.geolocation){
      alert('location is not supported');
      console.log('location is not supported');
    }else{
      navigator.geolocation.getCurrentPosition((position)=>{
      console.log('your position is:' + position.coords);
      this.http.get<any>('http://open.mapquestapi.com/geocoding/v1/reverse?key=EB5LwyiUfpvMcnajd9HKSIr72g9oASut&location='+ position.coords.latitude + ',' + position.coords.longitude +'&includeRoadMetadata=true&includeNearestIntersection=true&thumbMaps=true').subscribe({
              next: data => {
                console.log(data);
                if (confirm('is your address:  ' + data.results[0].locations[0].adminArea5 + ' ' + data.results[0].locations[0].street + '?' )){
                  this.shipping.address = data.results[0].locations[0].street;
                this.shipping.city = data.results[0].locations[0].adminArea5;
                }
                
              },
              error: error => {
                        console.error('There was an error!', error);
              }
      });
      });
    }
  }

  
}
