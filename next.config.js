
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {

        remotePatterns: [
            { protocol: 'https', hostname: 'res.cloudinary.com' },

            // https://vercel.com/grgrimales-projects
            { protocol: 'https', hostname: 'assets.vercel.com' },

            // GET https://teslo-shop-next-nu.vercel.app/_next/image?url=%2Fproducts%2F1633802-00-A_0_2000.jpg&w=640&q=75 400 (Bad Request)
            { protocol: 'https', hostname: 'teslo-shop-next-nu.vercel.app' }

        ]
    }
};

module.exports = nextConfig;