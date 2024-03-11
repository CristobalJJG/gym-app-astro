import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  build: {
    inlineStylesheets: "always",
  },
  output: "server",
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
    ssr: {
      noExternal: ["path-to-regexp"],
    },
  },
});
