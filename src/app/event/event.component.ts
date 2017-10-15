import { Component, OnInit } from '@angular/core';

import { Event } from '../model/event';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.less']
})
export class EventComponent implements OnInit {

  private eventCollection: AngularFirestoreCollection<Event>;
  events: Observable<Event[]>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) { 
   
  }

  ngOnInit() {
    let vm: EventComponent = this;
    vm.afAuth.auth.onAuthStateChanged(function(user) {
      if (user) {
        vm.eventCollection = vm.afs.collection<Event>(`/data/${vm.afAuth.auth.currentUser.uid}/events`);
        vm.events = vm.eventCollection.valueChanges();
      } else {
        // No user is signed in.
      }
    });

  }

}
