import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'ng-contact',
  standalone: true,
  imports: [UpperCasePipe],
  template: `
    <div class="contact">
      <div class="container">
        <div class="contact__content">
          <h2>
            {{ 'Contacto' | uppercase }}
          </h2>
          <a class="contact__email" href="mailto:angularbolivia@gmail.com">
            <img src="/img/email-logo.svg" alt="Logo de email" />
            angularbolivia@gmail.com
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .contact {
        background-color: #166ac5;
        padding: 64px 0;

        .contact__content {
          align-items: center;
          display: flex;
          flex-direction: column;
          gap: 24px;
          text-align: center;

          h2 {
            font-size: 24px;
          }

          .contact__email {
            img {
              display: inline;
            }
          }
        }
      }
    `,
  ],
})
export class ContactComponent {}
