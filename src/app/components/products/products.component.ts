import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { AppUser } from '../../models/app-user';
import { AccountService } from '../../services/account.service';
import { ProductService } from '../../services/product.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
  
  cart;
  subscription : Subscription;
  products;
  cartID
  userID
  
  appUser = <AppUser>{};
  constructor(
     private router: Router,
     private accountService: AccountService,
     private cartService: ShoppingCartService,
     private productService : ProductService,
     private shoppingCartService: ShoppingCartService) {


      this.cartID = localStorage.getItem('cartId')
    
   } 

   async ngOnInit(){
    this.products = this.productService.getAll()
    if (this.cartID){
      this.cart =  this.shoppingCartService.getCart(this.cartID).valueChanges()
    }
    else{
      await this.shoppingCartService.createCart()
      this.cartID = localStorage.getItem('cartId')
      this.cart = this.shoppingCartService.getCart(this.cartID).valueChanges()
    }
    
    
    this.subscription = this.accountService.getAccount().subscribe(appUser =>{
      this.appUser = appUser
    })

    

   
   }



   ngOnDestroy(){
     this.subscription.unsubscribe();
   }

   clearCart(){
    this.cartID = localStorage.getItem('cartId')
    this.cartService.clear(this.cartID);
   }

   checkout(){
     if(this.appUser){
      this.router.navigate(['/check-out']);
     }

     else{
      window.alert('you have to login first')
     }
   }

   createNewProduct(){
     let product = {
       image : '',
       price: '',
       title: ''
       
     }
     this.productService.create(product)
   }
 

  

}
