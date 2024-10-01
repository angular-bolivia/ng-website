import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'ng-next-events',
  standalone: true,
  imports: [NgFor, NgIf, UpperCasePipe],
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
          <p *ngIf="!events.length">
            No hay eventos próximos por el momento. ¡Vuelve pronto!
          </p>
        </div>
      </div>
    </div>
  `,
})
export class NextEventsComponent {
  events = [
    {
      title: 'Meetup Octubre Cochabamba',
      link: 'https://lu.ma/aeagfe6a',
      image: '/img/meetup-octubre.webp',
    },
  ];
}
