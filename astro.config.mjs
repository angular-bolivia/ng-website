import { defineConfig } from 'astro/config';
import analogjsangular from "@analogjs/astro-angular";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  integrations: [analogjsangular(), partytown()]
});