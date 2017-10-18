import { Component, OnInit, NgZone } from '@angular/core';

import { Event } from '../model/event';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.less']
})
export class EventComponent implements OnInit {

  private eventCollection: AngularFirestoreCollection<Event>;
  private subscription: Subscription;
  public currentUser: User;
  events: Observable<Event[]>;


  constructor(private afs: AngularFirestore, private authService: AuthService,  private zone: NgZone) { 
   
  }

  ngOnInit() {
    let vm: EventComponent = this;
    vm.subscription = vm.authService.currentUser
      .subscribe((user) => {
        vm.zone.run(() => {
            vm.currentUser = user;
            vm.updateShownEvents();
        });
      }); 
  }

  private updateShownEvents(): void {
    let vm: EventComponent = this;
    if (vm.currentUser.isLoggedIn) {
      vm.eventCollection = vm.afs.collection<Event>(`/data/${vm.currentUser.id}/events`);
      vm.events = vm.eventCollection.valueChanges();
    } 
  }

}
