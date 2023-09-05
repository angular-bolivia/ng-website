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
                alt="Fotografía de un speaker exponiendo"
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
                alt="Fotografía de la comunidad en un evento"
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
                  href="https://meetu.ps/c/36FDq/zlFnn/a"
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
  styles: [
    `
      .join-the-team {
        background-image: url('/img/background.png');
        background-size: cover;
        padding: 64px 0;

        .join-the-team__content {
          align-items: center;
          display: flex;
          flex-direction: column;
          gap: 48px;

          h2 {
            color: #f9b570;
            font-size: 24px;
          }

          .join-the-team__cards {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;

            .join-the-team__card {
              background-color: #1c1c1c;
              width: 100%;
              max-width: 392px;

              .join-the-team__card-title {
                padding: 16px;

                h3 {
                  font-size: 20px;
                  font-weight: 500;
                }
              }

              .join-the-team__card-content {
                padding: 16px;
              }

              .join-the-team__card-action {
                padding: 8px 16px;
              }
            }
          }
        }
      }
    `,
  ],
})
export class JoinTheTeamComponent {}
