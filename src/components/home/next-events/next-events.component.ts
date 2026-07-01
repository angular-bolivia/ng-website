import { UpperCasePipe } from "@angular/common";
import { Component, signal } from "@angular/core";

interface CommunityEvent {
  title: string;
  link: string;
  image: string;
}

@Component({
  selector: "ng-next-events",
  imports: [UpperCasePipe],
  template: `
    <div class="next-events">
      <div class="container">
        <h2>{{ "Próximos eventos" | uppercase }}</h2>
        <div class="next-events__cards">
          @for (event of events(); track event.link) {
            <div class="next-events__card">
              <img
                width="380"
                height="380"
                [alt]="event.title"
                [src]="event.image"
              />
              <a
                class="main-button"
                rel="noopener noreferrer"
                target="_blank"
                [href]="event.link"
              >
                {{ "Inscríbete al evento" | uppercase }}
              </a>
            </div>
          } @empty {
            <p>No hay eventos próximos por el momento. ¡Vuelve pronto!</p>
          }
        </div>
      </div>
    </div>
  `,
})
export class NextEventsComponent {
  readonly events = signal<CommunityEvent[]>([
    {
      title: "Meetup Julio",
      link: "https://events.combimauri.com/ng-meetup-jul-26",
      image: "/img/ng-meetup-jul-26.webp",
    },
  ]);
}
