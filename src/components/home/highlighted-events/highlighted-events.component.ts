import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

import { links } from '../../../links';

interface HighlightedEvent {
  url: string;
  logo: string;
  alt: string;
  width: number;
  height: number;
}

@Component({
  selector: 'ng-highlighted-events',
  imports: [UpperCasePipe],
  template: `
    <div class="highlighted-events">
      <div class="container">
        <div class="highlighted-events__content">
          <p>
            {{ 'Algunos de nuestros eventos organizados:' | uppercase }}
          </p>
          <div class="highlighted-events__logos">
            @for (event of events; track event.url) {
              <a [href]="event.url" rel="noopener noreferrer" target="_blank">
                <img
                  [src]="event.logo"
                  [width]="event.width"
                  [height]="event.height"
                  [alt]="event.alt"
                />
              </a>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HighlightedEventsComponent {
  readonly events: HighlightedEvent[] = [
    {
      url: links.events.ngBolivia2018,
      logo: '/img/ng-bolivia-2018-logo.png',
      width: 100,
      height: 109,
      alt: 'Logo de NG-Bolivia 2018 de la comunidad Angular Bolivia',
    },
    {
      url: links.events.ngBolivia2019,
      logo: '/img/ng-bolivia-2019-logo.png',
      width: 100,
      height: 110,
      alt: 'Logo de NG-Bolivia 2019 de la comunidad Angular Bolivia',
    },
    {
      url: links.events.tsday,
      logo: '/img/tsday-logo.png',
      width: 100,
      height: 53,
      alt: 'Logo de TSDay de la comunidad Angular Bolivia',
    },
    {
      url: links.events.ngShe,
      logo: '/img/ng-she-logo.png',
      width: 100,
      height: 120,
      alt: 'Logo de NG-She de la comunidad Angular Bolivia',
    },
  ];
}
