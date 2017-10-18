
import { Injectable, NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { User } from '../model/user';

import {Subscription} from 'rxjs/Subscription';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  private subscription: Subscription;
  public currentUser: User;

  constructor(private authService: AuthService, private router: Router, private zone: NgZone) {
    let vm: AuthGuard = this; 
    vm.subscription = vm.authService.currentUser
        .subscribe((user) => {
          vm.zone.run(() => {
              vm.currentUser = user;
          });
        }); 
  }

  canActivate() : boolean {
        return this.currentUser.isLoggedIn;
  }
}