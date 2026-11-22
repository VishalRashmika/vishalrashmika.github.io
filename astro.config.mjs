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
      priority: 0.8,
      lastmod: new Date(),
      customPages: [
        'https://vishalrashmika.com/llms.txt',
        'https://vishalrashmika.com/llms-full.txt',
      ],
      serialize(item) {
        if (item.url === 'https://vishalrashmika.com/' || item.url === 'https://vishalrashmika.com') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (item.url.includes('llms')) {
          item.priority = 0.9;
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
