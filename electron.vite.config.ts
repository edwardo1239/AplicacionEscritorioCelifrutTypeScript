/* eslint-disable prettier/prettier */
import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    envPrefix:'MAIN_VITE_',
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/main/index.ts'),
          imprimir: resolve(__dirname, 'src/main/imprimir.js'),
          imprimirPallet: resolve(__dirname, 'src/main/imprimirPallet.js')
        }
      }
    }
  },
  preload: {
    build:{
      rollupOptions:{
        input:{
          index: resolve(__dirname, "src/preload/index.ts"),
          login: resolve(__dirname, "src/preload/login.js"),
        }
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    
    build:{
      rollupOptions:{
        input:{
          login: resolve(__dirname, "src/renderer/login.html"),
          Main: resolve(__dirname, "src/renderer/index.html"),
        }
      }
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})
