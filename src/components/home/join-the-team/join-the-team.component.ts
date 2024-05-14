import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'ng-join-the-team',
  standalone: true,
  imports: [UpperCasePipe],
  template: `
    <div class="join-the-team">
      <div class="container">
        <div class="join-the-team__content">
          <h2>
            {{ 'Únete al equipo' | uppercase }}
          </h2>
          <div class="join-the-team__cards">
            <div class="join-the-team__card">
              <div class="join-the-team__card-title">
                <h3>¿Tienes algo para compartir?</h3>
              </div>
              <img
                src="/img/speakers-card.png"
                alt="Fotografía de un speaker exponiendo para la comunidad Angular Bolivia"
              />
              <div class="join-the-team__card-content">
                <p>
                  Si quieres compartir tu conocimiento y dar una charla,
                  ¡envíanos tu propuesta!
                </p>
                <br />
                <p>
                  Postula desde cualquier lugar del mundo y sé parte de nuestros
                  eventos de forma virtual o presencial.
                </p>
              </div>
              <div class="join-the-team__card-action">
                <a
                  class="main-button"
                  href="https://forms.gle/N8J3n5SUDymLJAyv8"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {{ 'Postula como speaker' | uppercase }}
                </a>
              </div>
            </div>
            <div class="join-the-team__card">
              <div class="join-the-team__card-title">
                <h3>¿Quieres unirte a la comunidad?</h3>
              </div>
              <img
                src="/img/team-card.png"
                alt="Fotografía de la comunidad Angular Bolivia en el evento NG-Bolivia 2018"
              />
              <div class="join-the-team__card-content">
                <p>¿Tienes muchas ganas de organizar eventos y aprender?</p>
                <br />
                <p>
                  ¡Únete a nosotros! Participa de nuestro siguiente evento para
                  no perder la oportunidad de ser parte de la comunidad.
                </p>
              </div>
              <div class="join-the-team__card-action">
                <a
                  class="main-button"
                  href="https://lu.ma/AngularRevolution-MC4"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {{ 'Inscríbete al próximo evento' | uppercase }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class JoinTheTeamComponent {}
