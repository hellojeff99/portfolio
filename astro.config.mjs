// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://hellojeff99-portfolio.vercel.app',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap(),
    icon({
      include: {
        ph: [
          'brackets-curly-bold',
          'database-bold',
          'gauge-bold',
          'stack-bold',
          'toolbox-bold',
          'user-fill',
          'calendar-blank-fill',
          'map-pin-fill',
          'phone-fill',
          'envelope-simple-fill',
          'graduation-cap-fill',
          'code-fill',
        ],
        lucide: [
          'user-round',
          'calendar-days',
          'graduation-cap',
          'map-pin',
          'briefcase',
          'mail',
          'code-xml',
        ],
        'material-symbols': [
          'person-rounded',
          'calendar-month-rounded',
          'school-rounded',
          'location-on-rounded',
          'work-rounded',
          'mail-rounded',
          'code-rounded',
        ],
        mdi: ['file-document-outline'],
      },
    }),
  ],
});
