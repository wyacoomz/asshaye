import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://yourdomain.com',
      dynamicRoutes: [
        '/',
        '/courses-grid-view',
        '/courses-list-view',
        '/judgements',
        '/otherCourse',
        '/new-course',
        '/course-layout-one',
        '/about',
        '/about-institue',
        '/about-why',
        '/about-Director',
        '/success-stories',
        '/online-classes',
        '/judicial-services',
        '/judicial-bihar',
        '/himanchal-haryana',
        '/jharkhand-perlims',
        '/event',
        '/team-members',
        '/faqs',
        '/blog',
        '/blog-with-sidebar',
        '/contact',
        '/enquiry',
        '/privacy',
        '/details'
      ]
    })
  ],
})
