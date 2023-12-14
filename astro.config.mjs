import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import htmx from 'astro-htmx'
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react(), htmx()],
  adapter: vercel()
})