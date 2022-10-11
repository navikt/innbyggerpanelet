import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'
import { esbuildCommonjs, viteCommonjs } from '@originjs/vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        'process.env': process.env,
    },
    plugins: [react(), eslintPlugin(), viteCommonjs()],
    base: '/innbyggerpanelet/ansatt/',
    server: {
        proxy: {
            '/innbyggerpanelet/ansatt/api': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    build: {
        emptyOutDir: false,
        minify: true,
        cssCodeSplit: true,
        outDir: 'dist',
        target: 'esnext',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.scss'],
    },
})
