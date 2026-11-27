import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://vishalrashmika.com',
  output: 'static',
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date(),
      serialize(item) {
        if (item.url === 'https://vishalrashmika.com/' || item.url === 'https://vishalrashmika.com') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        }
        item.lastmod = new Date();
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
