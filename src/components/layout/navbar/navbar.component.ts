import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

import { links } from '../../../links';

interface SocialLink {
  url: string;
  icon: string;
  alt: string;
  width: number;
  height: number;
}

@Component({
  selector: 'ng-navbar',
  imports: [UpperCasePipe],
  template: `
    <div class="navbar">
      <div class="container">
        <div class="navbar__content">
          <a href="/">
            <img
              src="/img/ng-logo.svg"
              width="34"
              height="36"
              alt="Logo principal de Angular Bolivia"
            />
          </a>
          <div class="navbar__links">
            <a class="main-button" href="#next-events">
              <span class="navbar__mobile-text">
                {{ 'Inscríbete' | uppercase }}
              </span>
              <span class="navbar__desktop-text">
                {{ 'Inscríbete al próximo evento' | uppercase }}
              </span>
            </a>
            @for (social of socialLinks; track social.url) {
              <a [href]="social.url" rel="noopener noreferrer" target="_blank">
                <img
                  [src]="social.icon"
                  [width]="social.width"
                  [height]="social.height"
                  [alt]="social.alt"
                />
              </a>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NavbarComponent {
  readonly socialLinks: SocialLink[] = [
    {
      url: links.social.twitter,
      icon: '/img/twitter-logo.svg',
      alt: 'Logo de Twitter',
      width: 24,
      height: 27,
    },
    {
      url: links.social.linkedin,
      icon: '/img/linkedin-logo.svg',
      alt: 'Logo de LinkedIn',
      width: 24,
      height: 24,
    },
    {
      url: links.social.facebook,
      icon: '/img/facebook-logo.svg',
      alt: 'Logo de Facebook',
      width: 24,
      height: 24,
    },
    {
      url: links.social.instagram,
      icon: '/img/instagram-logo.svg',
      alt: 'Logo de Instagram',
      width: 24,
      height: 24,
    },
  ];
}
