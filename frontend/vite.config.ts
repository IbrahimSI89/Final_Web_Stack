// This file configures Vite, the build tool used for the project. It defines how Vite should 
// bundle the application and which plugins to use.


/** @type {import('vite').UserConfig} */
// This imports Vite's defineConfig function, 
// which is used to define the configuration object.
import { defineConfig } from 'vite'

// This imports the React plugin for Vite, 
// enabling support for React - specific features like JSX and fast refresh.
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// This specifies that the React plugin should be used in the Vite build process.
export default defineConfig({
  plugins: [react()],
})
