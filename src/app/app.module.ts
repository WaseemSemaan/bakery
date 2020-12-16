import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { CustomFormsModule } from 'ng2-validation';

import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLogComponent } from './components/admin-log/admin-log.component';
import { AdminMessagesComponent } from './components/admin-messages/admin-messages.component';
import { AdminMessagesbyidComponent } from './components/admin-messagesbyid/admin-messagesbyid.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminOrdersbyidComponent } from './components/admin-ordersbyid/admin-ordersbyid.component';
import { AdminAccountsComponent } from './components/admin-accounts/admin-accounts.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { MessageComponent } from './components/message/message.component';
import { MymessagesComponent } from './components/mymessages/mymessages.component';
import { MyordersComponent } from './components/myorders/myorders.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderComponent } from './components/order/order.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { AccountService } from './services/account.service';




@NgModule({
  declarations: [
    AppComponent,          MessageComponent,      OrderComponent,      ProductCardComponent,
    MymessagesComponent,   ContactFormComponent,  NavbarComponent,     CheckoutComponent,
    ShoppingCartComponent, MyordersComponent,     ProductsComponent,   AdminMessagesComponent,
    AdminLogComponent,     AdminAccountsComponent,   AdminOrdersbyidComponent,
    AdminMessagesbyidComponent,                   AdminOrdersComponent,
    

  ],
  imports: [
    BrowserAnimationsModule,        CommonModule,              FormsModule,
    CustomFormsModule,              AngularFireAuthModule,     AppRoutingModule,
    NgbModule,                      HttpClientModule,          BrowserModule,
    FontAwesomeModule,              AngularFireDatabaseModule,
    
    AngularFireModule.initializeApp(environment.firebase),
    
    RouterModule.forRoot([
      {path: '',component: ProductsComponent},


      // Admin Routes:
      {path: 'admin/orders',component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/orders/:id',component: OrderComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/messages',component: AdminMessagesComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/messages/:id',component: MessageComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/logs',component: AdminLogComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/users',component: AdminAccountsComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/orders/ordersbyid/:id',component: AdminOrdersbyidComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/messages/messagesbyid/:id',component: AdminMessagesbyidComponent, canActivate: [AuthGuard, AdminAuthGuard]},



      {path: 'contact-form',component: ContactFormComponent, canActivate: [AuthGuard]},
      {path: 'my/messages',component: MymessagesComponent, canActivate: [AuthGuard]},
      {path: 'my/messages/:id',component: MessageComponent, canActivate: [AuthGuard]},


      {path: 'products',component: ProductsComponent},

      {path: 'check-out',component: CheckoutComponent, canActivate: [AuthGuard]},
      {path: 'my/orders',component: MyordersComponent, canActivate: [AuthGuard]},
      {path: 'my/orders/:id',component: OrderComponent, canActivate: [AuthGuard]},




    ]),
    NgbModule,
    FontAwesomeModule
  ],
  exports: [
    MessageComponent,
    OrderComponent,
    ProductCardComponent
  ],
  providers: [
    AdminAuthGuard,
    AuthGuard,
    AuthGuard,
    AccountService,
    AngularFirestore,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }