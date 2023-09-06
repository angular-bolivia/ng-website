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
            <img
              src="/img/email-logo.svg"
              width="16"
              height="20"
              alt="Logo de email"
            />
            angularbolivia@gmail.com
          </a>
        </div>
      </div>
    </div>
  `,
})
export class ContactComponent {}
