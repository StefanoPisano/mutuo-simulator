import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
    base: "/mutuo-simulator",
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