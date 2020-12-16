import { AccountService } from './account.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private accountService: AccountService) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.accountService.user.pipe(
      map(user => {
      if (user) return true;
        
      this.router.navigate(['/products']);
      return false;
     })
    )
  }
}
