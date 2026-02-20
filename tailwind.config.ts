import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class", // <--- ESTA LÍNEA ES OBLIGATORIA PARA next-themes
  content: [
    // ESCÁNER DE ARCHIVOS:
    // Le decimos a Tailwind: "Mira en src, en cualquier subcarpeta, 
    // cualquier archivo que termine en js, ts, jsx, tsx o mdx".
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // O simplemente una línea catch-all:
    "./src/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    tailwindcssAnimate
  ],
};
export default config;