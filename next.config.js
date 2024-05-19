
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {

        remotePatterns: [
            { protocol: 'https', hostname: 'res.cloudinary.com' },

            // https://vercel.com/grgrimales-projects
            { protocol: 'https', hostname: 'assets.vercel.com' }
        ]
    }
};

module.exports = nextConfig;