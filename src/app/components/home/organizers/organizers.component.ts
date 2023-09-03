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
              <img src="/img/mauri.png" alt="Fotografía de Mauricio Arce" />
              <p class="organizers__name">Mauricio Arce</p>
              <p>Front-end Developer</p>
              <a
                href="https://www.linkedin.com/in/combimauri/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src="/img/linked-in-logo.png" alt="Logo de LinkedIn" />
              </a>
            </div>
            <div class="organizers__profile">
              <img src="/img/griss.png" alt="Fotografía de Griselda García" />
              <p class="organizers__name">Griselda García</p>
              <p>Full Stack Developer</p>
              <a
                href="https://www.linkedin.com/in/combigriss/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src="/img/linked-in-logo.png" alt="Logo de LinkedIn" />
              </a>
            </div>
            <div class="organizers__profile">
              <img src="/img/gus.png" alt="Fotografía de Gustavo Pacchi" />
              <p class="organizers__name">Gustavo Pacchi</p>
              <p>UI/UX Designer</p>
              <a
                href="https://www.linkedin.com/in/gustavo-pacchi-villarroel/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src="/img/linked-in-logo.png" alt="Logo de LinkedIn" />
              </a>
            </div>
            <div class="organizers__profile">
              <img src="/img/lizzy.png" alt="Fotografía de Lizzy Mendivil" />
              <p class="organizers__name">Lizzy Mendivil</p>
              <p>Full Stack Developer</p>
              <a
                href="https://www.linkedin.com/in/lizzymendivil/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src="/img/linked-in-logo.png" alt="Logo de LinkedIn" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .organizers {
        background-color: #1c1c1c;
        padding: 64px 0;

        .organizers__content {
          align-items: center;
          display: flex;
          flex-direction: column;
          gap: 48px;
          text-align: center;

          h2 {
            color: #f9b570;
            font-size: 24px;
          }

          .organizers__profiles {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;

            .organizers__profile {
              align-items: center;
              display: flex;
              flex-direction: column;
              padding: 0 5px;

              .organizers__name {
                color: #33f8d8;
                font-size: 20px;
                font-weight: 500;
                margin-block-start: 16px;
              }

              a {
                display: block;
                width: fit-content;
              }
            }
          }
        }
      }
    `,
  ],
})
export class OrganizersComponent {}
