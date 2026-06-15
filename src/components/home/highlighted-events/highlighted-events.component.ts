import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

import { links } from '../../../links';

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
            <a
              [href]="links.events.ngBolivia2018"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src="/img/ng-bolivia-2018-logo.png"
                width="100"
                height="109"
                alt="Logo de NG-Bolivia 2018 de la comunidad Angular Bolivia"
              />
            </a>
            <a
              [href]="links.events.ngBolivia2019"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src="/img/ng-bolivia-2019-logo.png"
                width="100"
                height="110"
                alt="Logo de NG-Bolivia 2019 de la comunidad Angular Bolivia"
              />
            </a>
            <a
              [href]="links.events.tsday"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src="/img/tsday-logo.png"
                width="100"
                height="53"
                alt="Logo de TSDay de la comunidad Angular Bolivia"
              />
            </a>
            <a
              [href]="links.events.ngShe"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src="/img/ng-she-logo.png"
                width="100"
                height="120"
                alt="Logo de NG-She de la comunidad Angular Bolivia"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HighlightedEventsComponent {
  readonly links = links;
}
