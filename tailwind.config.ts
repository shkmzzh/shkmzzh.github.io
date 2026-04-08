import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        'header': 'var(--header-height)', 
      },
      colors: {
        bg: 'var(--bg-color)',
        text: 'var(--text-color)',
      },
    },
  },
  plugins: [],
};
export default config;
