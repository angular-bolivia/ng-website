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
          <div class="highlighted-events__logos">
            <a
              href="https://www.youtube.com/watch?v=Q3pp4bm5H3I&list=PLRejFvqDqGo6AMNYSLluAVGbq-CHQ0Lkt"
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
              href="https://www.youtube.com/watch?v=29w4cAjpMKA&list=PLRejFvqDqGo5moBGpb-A-QtZDjCMFFknf"
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
              href="https://www.youtube.com/live/_Gdygm9hBNA?si=LKauDOs0GqD4sKUl"
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
              href="https://ngshe.ng-bolivia.org/"
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
export class HighlightedEventsComponent {}
