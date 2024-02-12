/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'randomuser.me',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
            {
                protocol: 'https',
                hostname: 'cdn.rareblocks.xyz',
            },
            {
                protocol: 'https',
                hostname: 'cdn.tailgrids.com',
            },
        ],
    },
};

module.exports = nextConfig;
