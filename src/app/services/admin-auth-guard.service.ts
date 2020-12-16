import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

import { AccountService } from './account.service';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService) { }

  canActivate(): Observable<boolean> {
   
    return this.accountService.getAccount().pipe(
      map(user => {
      if (user.isAdmin) return true;

      this.router.navigate(['/']);
      return false;
     })
    )
  }

}
