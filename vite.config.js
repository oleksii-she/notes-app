import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/utils/variables.scss";`,
      },
    },
  },

  base: "/notes-app/",
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
