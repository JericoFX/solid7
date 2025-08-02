import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib';
  
  return {
    plugins: [solid()],
    build: isLib ? {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'Solid7CSS',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`
      },
      rollupOptions: {
        external: ['solid-js'],
        output: {
          globals: {
            'solid-js': 'SolidJS'
          }
        }
      },
      copyPublicDir: false
    } : {
      outDir: 'playground-dist'
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  };
});