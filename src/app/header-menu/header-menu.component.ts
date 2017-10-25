import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { MaterialDesignModule } from '../material-design/material-design.module';

import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.less']
})
export class HeaderMenuComponent implements OnInit {
  
  public currentUser: User;
  private subscription: Subscription;
  
  constructor(private authService: AuthService, private router: Router, private zone: NgZone) { 
  }

  ngOnInit() {
    let vm: HeaderMenuComponent = this; 
    vm.subscription = vm.authService.currentUser
        .subscribe((user) => {
          vm.zone.run(() => {
              vm.currentUser = user;
          });
        });   
  }
  
  signOut() {
    this.authService.signOut();
  }

}
