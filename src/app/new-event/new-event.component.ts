import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule  } from '@angular/forms';

import { Event } from '../model/event';
import { EventDto } from '../model/eventDto';
import { AuthService } from '../services/auth.service';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.less']
})
export class NewEventComponent implements OnInit {

  loading: Boolean = false;
  newEventCreated: Boolean = false;
  eventCollectionRef: AngularFirestoreCollection<Event>;
  myForm: FormGroup;
  defaultEvent: Event = { active: true, description: '', name: '',number : 1, timePeriod : "day" };

  constructor(private afs: AngularFirestore,  private fb: FormBuilder, private authService: AuthService) { 
    this.myForm = fb.group(this.defaultEvent); 
  }

  ngOnInit() {
  }

  onSubmit(event: EventDto) {
    let vm: NewEventComponent = this;
    vm.loading = true;
    vm.authService.getCurrentUserId().then((userId) => {
      vm.eventCollectionRef = vm.afs.collection<Event>(`/data/${userId}/events`);
      event.secret = vm.getGuid();
      event.dateLastUpdated = new Date();
      event.dateCreated = new Date();
      console.log(event.secret);
      vm.eventCollectionRef.add(event)
          .then(() => {
            vm.myForm.reset(this.defaultEvent);
            vm.loading = false;
            vm.newEventCreated = true;
      }); 
    })
  }

  private getGuid() : string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
