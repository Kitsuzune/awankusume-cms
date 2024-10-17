import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
        plugins: [tailwindcss()],
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        login: './src/pages/CMS-Auth/Login.jsx',
        contentAbout: './src/pages/ContentManagement/About/About.jsx',
        contentAboutEdit: './src/pages/ContentManagement/About/AboutEdit.jsx',
        contentArticle: './src/pages/ContentManagement/Article/Article.jsx',
        contentOurClient: './src/pages/ContentManagement/OurClient/OurClient.jsx',
        contentOurClientEdit: './src/pages/ContentManagement/OurClient/OurClientEdit.jsx',
        contentPartnership: './src/pages/ContentManagement/Partnership/Partnership.jsx',
        contentPartnershipEdit: './src/pages/ContentManagement/Partnership/PartnershipEdit.jsx',
        contentPromo: './src/pages/ContentManagement/Promo/Promo.jsx',
        contentService: './src/pages/ContentManagement/Service/Service.jsx',
      },
    },
  },
})
