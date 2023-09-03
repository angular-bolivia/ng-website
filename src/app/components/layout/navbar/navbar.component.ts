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
              src="/img/main-logo.png"
              alt="Logo principal de Angular Bolivia"
            />
            <span>{{ 'ngular Bolivia' | uppercase }}</span>
          </div>
          <div class="navbar__social-links">
            <a
              href="https://www.linkedin.com/company/angular-bolivia/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src="/img/linked-in-logo-large.png" alt="Logo de LinkedIn" />
            </a>
            <a
              href="https://www.facebook.com/angularBolivia/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src="/img/facebook-logo-large.png" alt="Logo de Facebook" />
            </a>
            <a
              href="https://www.instagram.com/angularbolivia/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src="/img/instagram-logo-large.png"
                alt="Logo de Instagram"
              />
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

            span {
              display: none;
              font-size: 14px;

              @media (min-width: 768px) {
                display: inline;
              }
            }
          }

          .navbar__social-links {
            display: flex;
          }
        }
      }
    `,
  ],
})
export class NavbarComponent {}
