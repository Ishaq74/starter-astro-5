// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import icon from 'astro-icon';

export default defineConfig({
integrations: [icon()],
adapter: vercel(),
});
