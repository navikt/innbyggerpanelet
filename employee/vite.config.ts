import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        'process.env': process.env,
    },
    plugins: [react(), eslintPlugin(), viteCommonjs(), tsconfigPaths()],
    base: '/innbyggerpanelet/ansatt/',
    server: {
        proxy: {
            '/innbyggerpanelet/ansatt/api': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: true,
    },
})
