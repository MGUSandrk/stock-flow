/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // 👈 AQUÍ ESTÁ EL CAMBIO CRÍTICO:
    // Usamos el nombre del paquete nuevo entre comillas
    '@tailwindcss/postcss': {}, 
    autoprefixer: {},
  },
};

export default config;