import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/icon"],
  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  eslint: {
    config: {
      standalone: false,
    },
  },
});
