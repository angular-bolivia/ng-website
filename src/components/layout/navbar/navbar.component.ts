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
              width="34"
              height="36"
              alt="Logo principal de Angular Bolivia"
            />
            <span>{{ 'ngular Bolivia' | uppercase }}</span>
          </div>
          <div class="navbar__links">
            <a
              class="main-button"
              href="https://www.meetup.com/angular-bolivia/events/297200793/?utm_medium=referral&utm_campaign=share-btn_savedevents_share_modal&utm_source=link"
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
              href="https://twitter.com/angularBolivia/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src="/img/twitter-logo.svg"
                width="24"
                height="27"
                alt="Logo de Twitter"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/angular-bolivia/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src="/img/linkedin-logo.svg"
                width="24"
                height="24"
                alt="Logo de LinkedIn"
              />
            </a>
            <a
              href="https://www.facebook.com/angularBolivia/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src="/img/facebook-logo.svg"
                width="24"
                height="24"
                alt="Logo de Facebook"
              />
            </a>
            <a
              href="https://www.instagram.com/angularbolivia/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src="/img/instagram-logo.svg"
                width="24"
                height="24"
                alt="Logo de Instagram"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NavbarComponent {}
