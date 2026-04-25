import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  base: '/frontend-authorization-demo-pt/', // Caminho para o GitHub Pages, não utilizado
  // no 'npm run dev', apenas para 'npm run build' e 'npm run preview'
  build: {
    outDir: 'docs', // onde o Vite colocará os arquivos para o build (por padrão é 'dist',
    // mas para rodar no GitHub Pages, existe a opção de gerar a partir de 'docs', no
    // GitHub)
    assetsDir: 'assets', // subpasta para o build dos arquivos estáticos (JS, CSS,
    // imagens, etc.)
  },
});
