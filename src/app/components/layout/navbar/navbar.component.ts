import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'ng-navbar',
  standalone: true,
  imports: [UpperCasePipe],
  template: `
    <div class="navbar">
      <div class="container">
        <div class="navbar__content">
          <div class="navbar__logo">
            <img
              src="/img/main-logo.svg"
              alt="Logo principal de Angular Bolivia"
            />
            <span>{{ 'ngular Bolivia' | uppercase }}</span>
          </div>
          <div class="navbar__links">
            <a
              class="main-button"
              href="https://meetu.ps/c/36FDq/zlFnn/a"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span class="navbar__mobile-text">
                {{ 'Inscríbete' | uppercase }}
              </span>
              <span class="navbar__desktop-text">
                {{ 'Inscríbete al próximo evento' | uppercase }}
              </span>
            </a>
            <a
              href="https://www.linkedin.com/company/angular-bolivia/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src="/img/linkedin-logo.svg" alt="Logo de LinkedIn" />
            </a>
            <a
              href="https://www.facebook.com/angularBolivia/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src="/img/facebook-logo.svg" alt="Logo de Facebook" />
            </a>
            <a
              href="https://www.instagram.com/angularbolivia/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src="/img/instagram-logo.svg" alt="Logo de Instagram" />
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .navbar {
        background-color: #141414;
        height: 64px;

        .container {
          height: 100%;
        }

        .navbar__content {
          align-items: center;
          display: flex;
          height: 100%;
          justify-content: space-between;

          .navbar__logo {
            align-items: center;
            display: flex;
            font-family: Roboto, sans-serif;

            img {
              height: 36px;
              width: 34px;
            }

            span {
              display: none;
              font-size: 14px;

              @media (min-width: 768px) {
                display: inline;
              }
            }
          }

          .navbar__links {
            align-items: center;
            display: flex;
            gap: 24px;

            .navbar__mobile-text {
              display: inline;

              @media (min-width: 768px) {
                display: none;
              }
            }

            .navbar__desktop-text {
              display: none;

              @media (min-width: 768px) {
                display: inline;
              }
            }
          }
        }
      }
    `,
  ],
})
export class NavbarComponent {}
