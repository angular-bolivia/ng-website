import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'ng-about-us',
  standalone: true,
  imports: [UpperCasePipe],
  template: `
    <div class="about-us">
      <div class="container">
        <div class="about-us__content">
          <div class="about-us__block">
            <h2>{{ '¿Quiénes somos y qué hacemos?' | uppercase }}</h2>
            <p>
              Localizados en Cochabamba, somos un grupo de desarrolladores
              entusiastas por la tecnología y los eventos. Compartimos contenido
              relacionado con Angular y el desarrollo de software. Organizamos
              eventos para aprender y conocernos entre nosotros.
            </p>
            <img
              src="/img/community-photo.png"
              alt="Fotografía de la comunidad en el NG-Bolivia 2019"
            />
          </div>
          <div class="about-us__block">
            <h2>{{ 'Nuestra historia' | uppercase }}</h2>
            <p>
              Fundada en el 2016 por Luis Aviles en Cochabamba, el propósito
              inicial fue el crear un espacio para el aprendizaje y el
              networking entre desarrolladores de software en torno al framework
              de Angular.
            </p>
            <br />
            <p>
              Desde entonces la comunidad ha organizado eventos internacionales
              y llegado a varios países a través de sus eventos virtuales en la
              pandemia.
            </p>
            <img
              src="/img/history-photo.png"
              alt="Fotografía de la comunidad en el NG-Bolivia 2018"
            />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .about-us {
        padding: 64px 0;

        .about-us__content {
          align-items: center;
          display: flex;
          flex-direction: column;
          gap: 64px;
          text-align: center;

          .about-us__block {
            align-items: center;
            display: flex;
            flex-direction: column;

            h2 {
              color: #f9b570;
              font-size: 24px;
              margin-block-end: 24px;
            }

            img {
              margin-top: 42px;
            }
          }
        }
      }
    `,
  ],
})
export class AboutUsComponent {}
