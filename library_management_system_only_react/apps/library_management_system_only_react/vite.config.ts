/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import type { Plugin } from 'postcss';

const postcssPlugins: Plugin[] = [
  tailwindcss as unknown as Plugin,
  autoprefixer as unknown as Plugin,
];

// const proxy = {
//   '/': {
//     target: 'http://localhost:3000',
//     changeOrigin: true,
//     // rewrite: (path: string) => path.replace(/^\//, '')
//   }
// } as const;

const proxy = {
  // Handle API requests
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api/, '')
  },
  // Handle auth requests
  '/auth': {
    target: 'http://localhost:3000',
    changeOrigin: true,
    secure: false,
    ws: true,
    configure: (proxy, _options) => {
      proxy.on('error', (err, _req, _res) => {
        console.log('proxy error', err);
      });
      proxy.on('proxyReq', (proxyReq, req, _res) => {
        console.log('Sending Request to the Target:', req.method, req.url);
      });
      proxy.on('proxyRes', (proxyRes, req, _res) => {
        console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
      });
    }
  }
} as const;


// // This one is fine!
// const proxy = {
//   '/api': {
//     target: 'http://localhost:3000',
//     changeOrigin: true,
//     rewrite: (path: string) => path.replace(/^\/api/, '')
//   }
// } as const;

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/library_management_system_only_react',
  server: {
    port: 4200,
    host: 'localhost',
    proxy 
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [
    !process.env.VITEST && reactRouter(),
  ].filter(Boolean),
  css: {
    postcss: {
      plugins: postcssPlugins,
    },
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
});
