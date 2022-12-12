import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import path from "path";
// import Unocss from "unocss/vite";

export default defineConfig({
  plugins: [
    vue(),
    //  Unocss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/style/index.scss";`,
      },
    },
  },
});
