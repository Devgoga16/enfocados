// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// PENDIENTE: reemplazar por el dominio final antes de publicar
// (o definir la variable de entorno SITE_URL en el hosting).
const site = process.env.SITE_URL ?? 'https://www.enfocados.pe';

export default defineConfig({
  site,
  integrations: [sitemap()],
});
