// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Candex Handbook — English is canonical; French is an alternate presentation.
export default defineConfig({
  site: 'https://candex.app',
  integrations: [
    starlight({
      title: 'Candex Handbook',
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        fr: { label: 'Français', lang: 'fr' },
      },
      customCss: ['./src/styles/candex.css'],
      components: {
        Head: './src/components/Head.astro',
        PageTitle: './src/components/PageTitle.astro',
      },
      sidebar: [
        {
          label: 'Getting Started',
          translations: { fr: 'Prise en main' },
          items: [
            { label: 'Product', translations: { fr: 'Produit' }, slug: 'getting-started' },
            { label: 'For developers', translations: { fr: 'Pour les développeurs' }, slug: 'getting-started-dev' },
          ],
        },
      ],
    }),
  ],
});
