// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";

const site = process.env.SITE_URL ?? "https://kkkkaniel.github.io";
const base = process.env.BASE_PATH ?? "/foveaflow";

/** @returns {import("vite").Plugin} */
function devWatcherListenerLimit() {
  return {
    name: "foveaflow:dev-watcher-listener-limit",
    enforce: "pre",
    apply: "serve",
    configureServer(server) {
      const currentLimit = server.watcher.getMaxListeners();

      if (currentLimit !== 0 && currentLimit < 30) {
        // Astro, Svelte, and Tailwind share Vite's dev watcher.
        server.watcher.setMaxListeners(30);
      }
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [svelte()],

  vite: {
    plugins: [devWatcherListenerLimit(), tailwindcss()],
  },
});
