
/**
 * this service implements the functionality of account and authentication
 */

import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';

import { AppUser } from '../models/app-user';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';

@Injectable()
export class AccountService {

  usedPoints;
  user: Observable<firebase.User>
  
  constructor(private db: AngularFireDatabase,
    private fireAuth: AngularFireAuth) {
    this.user = fireAuth.authState
   }

  save(firebaseUser: firebase.User) {

    this.db.object('/users/' + firebaseUser.uid).update({
      name: firebaseUser.displayName,
      email: firebaseUser.email,
    });
  }

  getAccount(): Observable<AppUser>{
    return this.user
    .pipe(
      switchMap(user => {
        if (user)  return this.db.object('/users/' + user.uid).valueChanges();
        return of(null);
      })
     );
  }

  get(uid: string): AngularFireObject<AppUser> { 
    return this.db.object('/users/' + uid);
  }

  login(){
    this.fireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    
  }
  logout(){
     this.fireAuth.auth.signOut();
     }


  updatePoints(user: firebase.User,points) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      points: points
    });
  }


  makeAdmin(userID){
    this.db.object('/users/' + userID).update({
      isAdmin: true
    })
  }


  removeAdmin(userID){
    this.db.object('/users/' + userID).update({
      isAdmin: false
    })
  }


  getAll() {
    return this.db.list('/users')
  }


  setUsedPoints(usedPoints){
    this.usedPoints = usedPoints;
  }


  getUsedPoints(){
    return this.usedPoints
  }

  
}