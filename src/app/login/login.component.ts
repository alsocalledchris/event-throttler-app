import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import {Subscription} from 'rxjs/Subscription';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  public currentUser: User;

  constructor(private authService: AuthService, private router: Router, private zone: NgZone) { }

  ngOnInit() {
    let vm: LoginComponent = this; 
    vm.subscription = vm.authService.currentUser
    .subscribe((user) => {
      vm.zone.run(() => {
          vm.currentUser = user;
      });
    }); 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public loginWithGoogle() : void {
    this.authService.signInWithGoogle().then(() => {
      this.router.navigate(['/home']);    
    });
  }
}
