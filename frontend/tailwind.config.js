// This file configures Tailwind CSS, 
// allowing for customization of the default design system.



/** @type {import('tailwindcss').Config} */
export default {
  // Specifies the paths to all files in the project where Tailwind CSS classes might be used. 
  // This allows Tailwind to purge unused styles in production.
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
  ],

  // Allows you to extend the default Tailwind theme with custom colors, spacing, typography, etc. In this case, 
  // custom colors for primary and secondary are defined.
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e3f2fd',  // Light shade of primary
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3',  // Base primary color (e.g., blue)
          600: '#1e88e5',
          700: '#1976d2',
          800: '#1565c0',
          900: '#0d47a1',  // Darkest shade
        },
        secondary: {
          50: '#fbe9e7',  // Light shade of secondary
          100: '#ffccbc',
          200: '#ffab91',
          300: '#ff8a65',
          400: '#ff7043',
          500: '#ff5722',  // Base secondary color (e.g., orange-red)
          600: '#f4511e',
          700: '#e64a19',
          800: '#d84315',
          900: '#bf360c',  // Darkest shade
        },
      },
    },
  },
  plugins: [],
}
