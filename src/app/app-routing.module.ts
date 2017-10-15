import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';
import { HomeComponent } from './home/home.component';
import { NewEventComponent } from './new-event/new-event.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'events',
    component: EventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new-event',
    component: NewEventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
