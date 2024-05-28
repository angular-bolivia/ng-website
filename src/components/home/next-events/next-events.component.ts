import { NgFor, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'ng-next-events',
  standalone: true,
  imports: [NgFor, UpperCasePipe],
  template: `
    <div class="next-events">
      <div class="container">
        <h2>{{ 'Próximos eventos' | uppercase }}</h2>
        <div class="next-events__cards">
          <div *ngFor="let event of events" class="next-events__card">
            <img
              width="380"
              height="380"
              [alt]="event.title"
              [src]="event.image"
            />
            <a
              class="main-button"
              rel="noopener noreferrer"
              target="_blank"
              [href]="event.link"
            >
              {{ 'Inscríbete al evento' | uppercase }}
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NextEventsComponent {
  events = [
    {
      title: 'Explorando Angular 18',
      link: 'https://lu.ma/0m25cmh4',
      image: '/img/explorando-angular.png',
    },
    {
      title: 'Angular Revolution',
      link: 'https://lu.ma/AngularRevolution-MC4',
      image: '/img/angular-revolution.jpeg',
    },
  ];
}