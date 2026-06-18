import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    resolve: {
        alias: {
            $app: path.resolve(__dirname, 'src/app'),
            $modules: path.resolve(__dirname, 'src/modules'),
            $pages: path.resolve(__dirname, 'src/pages'),
            $common: path.resolve(__dirname, 'src/common'),
        }
    }
})
