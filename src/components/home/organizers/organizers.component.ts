import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'ng-organizers',
  standalone: true,
  imports: [UpperCasePipe],
  template: `
    <div class="organizers">
      <div class="container">
        <div class="organizers__content">
          <h2>{{ 'Lead organizers' | uppercase }}</h2>
          <div class="organizers__profiles">
            <div class="organizers__profile">
              <img
                src="/img/luis.webp"
                width="180"
                height="180"
                alt="Fotografía de Luis Aviles, Lead Organizer de Angular Bolivia"
              />
              <p class="organizers__name">Luis Aviles</p>
              <p>Sr. Software Engineer</p>
              <a
                href="https://www.linkedin.com/in/luixaviles/"
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
            <div class="organizers__profile">
              <img
                src="/img/mauri.webp"
                width="180"
                height="180"
                alt="Fotografía de Mauricio Arce, Lead Organizer de Angular Bolivia"
              />
              <p class="organizers__name">Mauricio Arce</p>
              <p>Front-end Developer</p>
              <a
                href="https://www.linkedin.com/in/combimauri/"
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
            <div class="organizers__profile">
              <img
                src="/img/griss.webp"
                width="180"
                height="180"
                alt="Fotografía de Griselda García, Lead Organizer de Angular Bolivia"
              />
              <p class="organizers__name">Griselda García</p>
              <p>Full Stack Developer</p>
              <a
                href="https://www.linkedin.com/in/combigriss/"
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
            <div class="organizers__profile">
              <img
                src="/img/gus.webp"
                width="180"
                height="180"
                alt="Fotografía de Gustavo Pacchi, Lead Organizer de Angular Bolivia"
              />
              <p class="organizers__name">Gustavo Pacchi</p>
              <p>UI/UX Designer</p>
              <a
                href="https://www.linkedin.com/in/gustavo-pacchi-villarroel/"
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
            <div class="organizers__profile">
              <img
                src="/img/rodri.webp"
                width="180"
                height="180"
                alt="Fotografía de Rodrigo Torrico, Lead Organizer de Angular Bolivia"
              />
              <p class="organizers__name">Rodrigo Torrico</p>
              <p>Sr. Software Developer</p>
              <a
                href="https://www.linkedin.com/in/tokidev/"
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
          </div>
        </div>
      </div>
    </div>
  `,
})
export class OrganizersComponent {}
