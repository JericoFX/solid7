import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib';
  
  return {
    plugins: [
      solid(),
      // Plugin to copy 7.css to dist folder
      {
        name: 'copy-7css',
        apply: 'build',
        generateBundle() {
          if (isLib) {
            try {
              // Copy 7.css from node_modules to dist
              const source = resolve(__dirname, 'node_modules/7.css/dist/7.css');
              const dest = resolve(__dirname, 'dist/7.css');
              mkdirSync(resolve(__dirname, 'dist'), { recursive: true });
              copyFileSync(source, dest);
              console.log('✓ Copied 7.css to dist folder');
            } catch (error) {
              console.warn('Warning: Could not copy 7.css:', error.message);
            }
          }
        }
      }
    ],
    build: isLib ? {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'Solid7CSS',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`
      },
      rollupOptions: {
        external: ['solid-js', '7.css'],
        output: {
          globals: {
            'solid-js': 'SolidJS',
            '7.css': '7CSS'
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