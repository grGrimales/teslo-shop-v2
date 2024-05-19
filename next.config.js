
const next = require('next');
const { join } = require('path');

// Determina si la aplicación está en modo desarrollo
const isDev = process.env.NODE_ENV !== 'production';

// Carga la configuración de Next.js desde el archivo de configuración
const nextConfig = require('./next.config.js');

// Crea una instancia del servidor de Next.js con la configuración extendida
const nextjsServer = next({
  dev: isDev,
  conf: nextConfig // Utiliza directamente la configuración importada
});




/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'res.cloudinary.com' }
        ]
    }
};

module.exports = nextConfig;




