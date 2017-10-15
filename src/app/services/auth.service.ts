import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

    constructor(private router: Router, public afAuth: AngularFireAuth) { 
       
    }

    public isLoggedIn() : Promise<boolean> {
        let vm: AuthService = this;
        return new Promise((resolve, reject) => {
            vm.afAuth.auth.onAuthStateChanged(function(user) {
                if (user) {
                    resolve(true);
                }
                else {
                    vm.router.navigate(['/login']);
                    resolve(false);
                }
            });
          });       
    }

    public getCurrentUserId(): Promise<string> {
        let vm: AuthService = this;
        return new Promise((resolve, reject) => {
            vm.afAuth.auth.onAuthStateChanged(function(user) {
                if (user) {
                    resolve(vm.afAuth.auth.currentUser.uid);
                }
                else {
                    reject();
                }
            });
          });
    }

    public getCurrentUser(): Promise<firebase.User> {
        let vm: AuthService = this;
        return new Promise((resolve, reject) => {
            vm.afAuth.auth.onAuthStateChanged(function(user) {
                if (user) {
                    resolve(vm.afAuth.auth.currentUser);
                }
                else {
                    reject();
                }
            });
          });
    }

    signInWithGoogle() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/home']);
        })
    }
}