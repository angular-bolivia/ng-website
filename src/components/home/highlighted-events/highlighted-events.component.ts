import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'ng-highlighted-events',
  standalone: true,
  imports: [UpperCasePipe],
  template: `
    <div class="highlighted-events">
      <div class="container">
        <div class="highlighted-events__content">
          <p>
            {{ 'Algunos de nuestros eventos organizados:' | uppercase }}
          </p>
          <div class="highlighted-events__logo">
            <img src="/img/ng-bolivia-2018-logo.png" alt="Logo de NG-Bolivia 2018" />
            <img src="/img/ng-bolivia-2019-logo.png" alt="Logo de NG-Bolivia 2019" />
            <img src="/img/tsday-logo.png" alt="Logo de TSDay" />
            <img src="/img/ng-she-logo.png" alt="Logo de NG-She" />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HighlightedEventsComponent {}