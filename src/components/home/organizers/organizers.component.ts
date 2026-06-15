import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

import { links } from '../../../links';

interface Organizer {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
}

@Component({
  selector: 'ng-organizers',
  imports: [UpperCasePipe],
  template: `
    <div class="organizers">
      <div class="container">
        <div class="organizers__content">
          <h2>{{ 'Lead organizers' | uppercase }}</h2>
          <div class="organizers__profiles">
            @for (organizer of organizers; track organizer.linkedin) {
              <div class="organizers__profile">
                <img
                  [src]="organizer.photo"
                  width="180"
                  height="180"
                  [alt]="
                    'Fotografía de ' +
                    organizer.name +
                    ', Lead Organizer de Angular Bolivia'
                  "
                />
                <p class="organizers__name">{{ organizer.name }}</p>
                <p>{{ organizer.role }}</p>
                <a
                  [href]="organizer.linkedin"
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
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class OrganizersComponent {
  readonly organizers: Organizer[] = [
    {
      name: 'Luis Aviles',
      role: 'Sr. Software Engineer',
      photo: '/img/luis.webp',
      linkedin: links.team.luisAviles,
    },
    {
      name: 'Mauricio Arce',
      role: 'Front-end Developer',
      photo: '/img/mauri.webp',
      linkedin: links.team.mauricioArce,
    },
    {
      name: 'Griselda García',
      role: 'Full Stack Developer',
      photo: '/img/griss.webp',
      linkedin: links.team.griseldaGarcia,
    },
    {
      name: 'Rodrigo Torrico',
      role: 'Sr. Software Developer',
      photo: '/img/rodri.webp',
      linkedin: links.team.rodrigoTorrico,
    },
  ];
}
