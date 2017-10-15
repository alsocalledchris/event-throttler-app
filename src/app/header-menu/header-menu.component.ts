import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.less']
})
export class HeaderMenuComponent implements OnInit {
  
  public currentUser: firebase.User;
  
  constructor(private authService: AuthService) { 
    let vm: HeaderMenuComponent = this;
    vm.authService.getCurrentUser().then((user: firebase.User) => {
      vm.currentUser = user;
    }); 
  }

  ngOnInit() {
  }
  
  signOut() {
    this.authService.signOut();
  }

}
