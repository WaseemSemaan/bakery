import { Observable } from 'rxjs/internal/Observable';
import { take, map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {




  constructor(private db: AngularFireDatabase) { }



       

      getCart(id) {
        return this.db.object('/shopping-carts/' + id)
      }



  async createCart(){
    let result = await this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
      totalPrice: 0,
      totalCount: 0
    })
    localStorage.setItem('cartId',result.key);
  }


   getItem(cartID: string, productID: string){
    return this.db.object('/shopping-carts/' + cartID + '/items/' + productID );

  }


  getItems(id){
    return this.db.list('/shopping-carts/' + id + '/items/' );
  }


  getTotalPrice(id){
    return this.db.object(('/shopping-carts/' + id + '/totalPrice/'))
  }

  setTotalPrice(id,price){

    this.db.object(('/shopping-carts/' + id)).update({totalPrice: price})
  }

  getTotalCount(id){
    return this.db.object(('/shopping-carts/' + id +  '/totalCount/'))
  }

  getItemQuantity(cartID, productID){
    return this.db.object('shopping-carts/' + cartID + '/items/' + productID)
  }

  async add(product: Product,quantity,id){   
    let cartID = id

    let item = this.getItem(cartID,product.key)
    let cart = this.getCart(id)
    cart.snapshotChanges().pipe(take(1)).subscribe(
      crt => {
        cart.update({totalPrice: crt.payload.val()['totalPrice'] + Number(product.value.price),
                     totalCount: crt.payload.val()['totalCount'] + 1})
      }
    )
    
    item.snapshotChanges().pipe(take(1)).subscribe(itm =>{
      if(itm.payload.val()){
        item.update({quantity: itm.payload.val()['quantity'] + 1,
                     totalPrice: itm.payload.val()['totalPrice'] + Number(product.value.price) });

      }
      else{
        item.set({
          title: product.value.title ,
          price: Number(product.value.price),
          totalPrice: Number(product.value.price),
          quantity:1});
      }
    })
  }

  async remove(product : Product ,id){
    let cartID = id
    let item = this.getItem(cartID,product.key)
    let cart = this.getCart(id)
    cart.snapshotChanges().pipe(take(1)).subscribe(
      crt => {
        cart.update({totalPrice: crt.payload.val()['totalPrice'] - Number(product.value.price),
                     totalCount: crt.payload.val()['totalCount'] - 1})
      }
    )
    item.snapshotChanges().pipe(take(1)).subscribe(itm =>{
      item.update({quantity: itm.payload.val()['quantity'] - 1,
                   totalPrice: itm.payload.val()['totalPrice'] - Number(product.value.price)});
      console.log(itm.payload.val()['quantity'])
      if (itm.payload.val()['quantity'] == 1){
        item.remove()
      }
    })
  }

  async clear(id){
    this.db.object('/shopping-carts/' + id + '/items').remove()
    this.db.object('/shopping-carts/' + id).update({
      totalPrice: 0,
      totalCount: 0
    })
  }

}
