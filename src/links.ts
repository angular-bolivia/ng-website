/**
 * Centralized external links used across the site.
 * Keep every outbound URL here so they have a single source of truth.
 */
export const links = {
  /** Call-to-action: speaker call for submissions. */
  speakerApplication: 'https://cfs.ng.com.bo',

  /** Angular Bolivia community social media profiles. */
  social: {
    twitter: 'https://twitter.com/angularBolivia/',
    linkedin: 'https://www.linkedin.com/company/angular-bolivia/',
    facebook: 'https://www.facebook.com/angularBolivia/',
    instagram: 'https://www.instagram.com/angularbolivia/',
  },

  /** LinkedIn profiles of the lead organizers. */
  team: {
    luisAviles: 'https://www.linkedin.com/in/luixaviles/',
    mauricioArce: 'https://www.linkedin.com/in/combimauri/',
    griseldaGarcia: 'https://www.linkedin.com/in/combigriss/',
    gustavoPacchi: 'https://www.linkedin.com/in/gustavo-pacchi-villarroel/',
    rodrigoTorrico: 'https://www.linkedin.com/in/tokidev/',
  },

  /** Recordings/sites of highlighted past events. */
  events: {
    ngBolivia2018:
      'https://www.youtube.com/watch?v=Q3pp4bm5H3I&list=PLRejFvqDqGo6AMNYSLluAVGbq-CHQ0Lkt',
    ngBolivia2019:
      'https://www.youtube.com/watch?v=29w4cAjpMKA&list=PLRejFvqDqGo5moBGpb-A-QtZDjCMFFknf',
    tsday: 'https://www.youtube.com/live/_Gdygm9hBNA?si=LKauDOs0GqD4sKUl',
    ngShe: 'https://ngshe.ng-bolivia.org/',
  },
} as const;
