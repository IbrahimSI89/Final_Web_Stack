// This file configures PostCSS, a tool used to transform CSS with plugins, 
// such as Tailwind CSS and Autoprefixer.



export default {
  plugins: {
    // This configures the PostCSS plugin for Tailwind CSS, 
    // enabling Tailwind's utility-first CSS in the project.
    tailwindcss: {},
    // This plugin automatically adds vendor prefixes to CSS properties, 
    // ensuring better cross- browser compatibility.
    autoprefixer: {},
  },
}
