// tailwind.config.js
import scrollbarPlugin from 'tailwind-scrollbar';

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    scrollbarPlugin, 
  ],
};

export default config;
