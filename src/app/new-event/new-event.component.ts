import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule  } from '@angular/forms';

import { Event } from '../model/event';
import { EventDto } from '../model/eventDto';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { MatSnackBar } from '@angular/material';


import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.less']
})
export class NewEventComponent implements OnInit {

  private subscription: Subscription;
  public currentUser: User;
  loading: Boolean = false;
  newEventCreated: Boolean = false;
  eventCollectionRef: AngularFirestoreCollection<Event>;
  myForm: FormGroup;
  defaultEvent: Event = { active: true, description: '', name: '',number : 1, timePeriod : "day" };

  constructor(private afs: AngularFirestore,  private fb: FormBuilder, private authService: AuthService,  
                private zone: NgZone, public snackBar: MatSnackBar) { 
    this.myForm = fb.group(this.defaultEvent); 
  }

  ngOnInit() {
    let vm: NewEventComponent = this; 
    vm.subscription = vm.authService.currentUser
        .subscribe((user) => {
          vm.zone.run(() => {
              vm.currentUser = user;
          });
        }); 
  }

  onSubmit(event: EventDto) {
    let vm: NewEventComponent = this;
    vm.loading = true;
    vm.eventCollectionRef = vm.afs.collection<Event>(`/data/${vm.currentUser.id}/events`);
    event.secret = vm.getGuid();
    event.dateLastUpdated = new Date();
    event.dateCreated = new Date();
    console.log(event.secret);
    vm.eventCollectionRef.add(event)
        .then(() => {
          vm.myForm.reset(this.defaultEvent);
          vm.loading = false;
          vm.snackBar.open("New Event Throttler Saved", "Ok");
    }); 
  }

  private getGuid() : string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
