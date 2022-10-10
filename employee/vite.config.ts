import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        'process.env': process.env,
    },
    plugins: [react(), eslintPlugin()],
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
})
