/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com'
        },
        // https://teslo-shop-next-nu.vercel.app/
        {
            protocol: 'https',
            hostname: 'teslo-shop-next-nu.vercel.app'
        }
      ]
    }
  }
  
  module.exports = nextConfig