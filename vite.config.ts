import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass'
import path from "path";



export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@Components": path.resolve(__dirname, "src/Components")
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                implementation: sass
            }
        }
    }
})
