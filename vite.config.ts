import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      // Ajoutez des alias pour vos chemins ici
      "@lib": path.resolve(__dirname, "src/lib"),
      // ...
    },
  },
});
