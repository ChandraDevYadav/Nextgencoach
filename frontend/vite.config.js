import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/av": {
        target: "https://source.zoom.us/2.13.0/lib",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/av/, ""),
      },
    },
  },
});
