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
  styles: [
    `
      .banner {
        align-items: center;
        background-image: url('/img/background.png');
        background-size: cover;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 64px);
        min-height: 762px;
        position: relative;

        .banner__content {
          align-items: center;
          display: flex;
          flex-direction: column;
          max-width: 100%;
          padding: 0 15px;
          width: 972px;

          h1 {
            font-family: ClashGrotesk, sans-serif;
            font-size: 30px;
            letter-spacing: 4px;
            line-height: normal;
            text-align: center;
            text-shadow: 0 4px 4px #00000070;

            @media (min-width: 576px) {
              font-size: 40px;
              letter-spacing: 8px;
            }
          }

          .banner__logo {
            margin: 65px 0 48px 0;
          }
        }

        .banner__world {
          bottom: 0;
          position: absolute;
          width: 100%;

          img {
            width: inherit;
          }
        }
      }
    `,
  ],
})
export class BannerComponent {}
