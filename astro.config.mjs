// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Candex Handbook — English is canonical; French is an alternate presentation.
export default defineConfig({
  site: 'https://candex.app',
  vite: { optimizeDeps: { include: ['mermaid'] } },
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
            { label: 'Understanding Candex', translations: { fr: 'Comprendre Candex' }, slug: 'getting-started' },
            { label: 'For developers', translations: { fr: 'Pour les développeurs' }, slug: 'getting-started-dev' },
          ],
        },
        {
          label: 'Architecture',
          translations: { fr: 'Architecture' },
          items: [
            { label: 'Overview', translations: { fr: 'Vue d\'ensemble' }, slug: 'architecture' },
            { label: 'Database & Model', translations: { fr: 'Base de données & Modèle' }, slug: 'database' },
            { label: 'Back-end', translations: { fr: 'Back-end' }, slug: 'back-end' },
            { label: 'Front-end', translations: { fr: 'Front-end' }, slug: 'front-end' },
            { label: 'UI / UX', translations: { fr: 'UI / UX' }, slug: 'ui-ux' },
            { label: 'API & Contracts', translations: { fr: 'API & Contrats' }, slug: 'api-contracts' },
            { label: 'Security', translations: { fr: 'Sécurité' }, slug: 'security' },
          ],
        },
        {
          label: 'Quality',
          translations: { fr: 'Qualité' },
          items: [
            { label: 'Software Quality', translations: { fr: 'Qualité logicielle' }, slug: 'software-quality' },
            { label: 'Testing', translations: { fr: 'Tests' }, slug: 'testing' },
          ],
        },
        {
          label: 'Guides',
          translations: { fr: 'Guides' },
          items: [
            { label: 'Local Installation', translations: { fr: 'Installation locale' }, slug: 'local-installation' },
            { label: 'Deployment', translations: { fr: 'Déploiement' }, slug: 'deployment' },
            { label: 'Backups', translations: { fr: 'Sauvegardes' }, slug: 'backups' },
          ],
        },
      ],
    }),
  ],
});
