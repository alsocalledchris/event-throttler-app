import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';

import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

    private currentUserSource: BehaviorSubject<User> = new BehaviorSubject<User>({ name: "", isLoggedIn: false, id: '' });

    constructor(private router: Router, public afAuth: AngularFireAuth) { 
        let vm: AuthService = this;
        vm.afAuth.auth.onAuthStateChanged(function(fbUser) {
            if (fbUser) {
                vm.currentUserSource.next({ name: fbUser.displayName, isLoggedIn: true, id: fbUser.uid });
            } else {
                vm.currentUserSource.next({ name: "", isLoggedIn: false, id: '' }); 
            }
        });
    }
   
    public currentUser = this.currentUserSource.asObservable();

    signInWithGoogle() : Promise<any> {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/home']);
        })
    }
}