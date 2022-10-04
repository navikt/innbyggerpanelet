import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        'process.env': process.env,
    },
    plugins: [react(), eslintPlugin()],
    base: '/innbyggerpanelet/innbygger/',
    server: {
        proxy: {
            '/api': {
                target: 'localhost:8080',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
})
