import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Orange Dominant
        primary: {
          DEFAULT: '#FF6B1A', // Orange Principal (votre logo)
          dark: '#E65100',    // Orange plus foncé pour hover
          light: '#FF8A4C',   // Orange plus clair
        },
        sky: {
          DEFAULT: '#5BA4D4', // Bleu ciel (des illustrations)
          dark: '#4A90E2',
          light: '#7AB8E0',
        },
        nature: {
          DEFAULT: '#7BC74D', // Vert Nature
          dark: '#5A9B35',
          light: '#9DD676',
        },
      },
    },
  },
  plugins: [],
};
export default config;
