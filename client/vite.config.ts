import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {tanstackRouter} from '@tanstack/router-plugin/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tanstackRouter({
            target: 'react',
            autoCodeSplitting: true,
        }),
        react()],
    resolve: {
        alias: {
            $app: path.resolve(__dirname, 'src/app'),
            $pages: path.resolve(__dirname, 'src/pages'),
            $routes: path.resolve(__dirname, 'src/routes'),
            $entities: path.resolve(__dirname, 'src/entities'),
            $shared: path.resolve(__dirname, 'src/shared'),
        }
    }
})
