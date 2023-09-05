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
              Fundada en marzo de 2017 por
              <a
                href="https://www.linkedin.com/in/luixaviles/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Luis Aviles
              </a>
              en Cochabamba. La comunidad nace con la idea de crear un espacio
              seguro para compartir aprendizajes y experiencias en torno a
              tecnologías web modernas con un enfoque en Angular, un framework
              de desarrollo web dirigido por Google.
            </p>
            <br />
            <p>
              Desde entonces la comunidad ha organizado eventos locales e
              internacionales, generando un gran impacto por la calidad de sus
              charlas y speakers, y tras la llegada de la pandemia extendió su
              alcance hasta varios países a través de sus eventos virtuales.
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
})
export class AboutUsComponent {}
