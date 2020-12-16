import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { AccountService } from '../../services/account.service';

import { ShoppingCartService } from '../../services/shopping-cart.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy{
  appUser = <any>{};
  mode = 'view';
  username;
  productQuantity
  productID
  items
  accountSubscription: Subscription;
  cartSubscription: Subscription

  @Input('product') product;
  @Input('cartID') cartID;
  @Input('shopping-cart') shoppingCart;
  constructor(
      private productService: ProductService,
      private logService: LogService,
      private accountService: AccountService, 
      private shoppingCartService: ShoppingCartService
    )
    {
   }
   // comment
   ngOnInit(){
    this.accountSubscription = this.accountService.getAccount().subscribe(appUser =>{
      if (appUser) { this.username = appUser.name }
      this.appUser = appUser
    });
    if (this.product.value.price == ''){
      this.mode = 'edit'
    }


    this.productID = this.product.key
    this.cartSubscription = this.shoppingCartService.getItem(this.cartID,this.productID).snapshotChanges()
    .subscribe(item  =>{
      if(item.payload.val()){
         this.productQuantity = item.payload.val()['quantity'] 
        }
      else{
        this.productQuantity = 0
      }
    } )
   }


   ngOnDestroy(){
     this.accountSubscription.unsubscribe();
     this.cartSubscription.unsubscribe();
   }


  addToCart(){
    this.shoppingCartService.add(this.product,1,this.cartID)
   }


   removeFromCart() {
    if(this.productQuantity > 0)
      this.shoppingCartService.remove(this.product,this.cartID);
   }

   
   edit(){
     this.mode = 'edit' 
   }

   save(){ 
    this.productService.update(this.product.key,this.product.value)
    let details = this.product.value.title + ', ' + this.product.value.price + '$'
    this.logService.addLog(this.username,'products', ' updated product ',this.product.key, '(' + details + ')')
    this.mode = 'view' 
  }

  delete(){
    this.productService.delete(this.product.key);
    this.mode = 'view'
    let details = this.product.value.title + ', ' + this.product.value.price + '$'
    if (this.product.value.price){
      this.logService.addLog(this.username,'products', ' deleted product ',this.product.key, '(' + details + ')')

    }
    else{
      this.logService.addLog(this.username,'products', ' deleted empty product' , '','')
    }

  }

}
