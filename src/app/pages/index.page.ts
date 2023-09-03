import { Component } from '@angular/core';

import { AboutUsComponent } from '../components/home/about-us/about-us.component';
import { BannerComponent } from '../components/home/banner/banner.component';
import { ContactComponent } from '../components/home/contact/contact.component';
import { HighlightedEventsComponent } from '../components/home/highlighted-events/highlighted-events.component';
import { JoinTheTeamComponent } from '../components/home/join-the-team/join-the-team.component';
import { NavbarComponent } from '../components/layout/navbar/navbar.component';
import { OrganizersComponent } from '../components/home/organizers/organizers.component';

@Component({
  selector: 'ng-home',
  standalone: true,
  imports: [
    AboutUsComponent,
    BannerComponent,
    ContactComponent,
    HighlightedEventsComponent,
    JoinTheTeamComponent,
    NavbarComponent,
    OrganizersComponent,
  ],
  template: `
    <ng-navbar></ng-navbar>
    <ng-banner></ng-banner>
    <div class="about-us">
      <ng-highlighted-events></ng-highlighted-events>
      <ng-about-us></ng-about-us>
    </div>
    <ng-organizers></ng-organizers>
    <ng-join-the-team></ng-join-the-team>
    <ng-contact></ng-contact>
  `,
  styles: [
    `
      .about-us {
        background-image: url('/img/background.png');
        background-size: cover;
      }
    `,
  ],
})
export default class HomeComponent {}
