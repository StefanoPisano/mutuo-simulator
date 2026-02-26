import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
    base: "/mutuo-simulator",
    server: {
        host: '0.0.0.0',
        port: 3000,
    },
    plugins: [react()],
    resolve: {
        alias: {
            "@Components": path.resolve(__dirname, "src/components"),
            "@Pages": path.resolve(__dirname, "src/pages")
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    mui: [
                        '@mui/material',
                        '@mui/icons-material',
                        '@emotion/react',
                        '@emotion/styled'
                    ]
                }
            }
        }
    }
})