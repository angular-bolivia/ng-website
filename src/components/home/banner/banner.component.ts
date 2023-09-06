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
          width="369"
          height="395"
          src="/img/ng-logo.svg"
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
