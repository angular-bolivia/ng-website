import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'ng-banner',
  standalone: true,
  imports: [UpperCasePipe],
  template: `
    <div class="banner">
      <div class="banner__content">
        <img
          class="banner__logo"
          width="650"
          height="100"
          src="/img/main-logo.svg"
          alt="Logo de Angular Bolivia"
        />
        <h1>
          {{ 'Comunidad de desarrolladores de software' | uppercase }}
        </h1>
      </div>
      <div class="banner__world">
        <img src="/img/world-bg.png" alt="Planeta Tierra" />
      </div>
    </div>
  `,
})
export class BannerComponent {}
