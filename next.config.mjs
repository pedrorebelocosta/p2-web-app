/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
            }
        ]
    },
    redirects: async () => {
        return [
            {
                source: "/",
                destination: "/products",
                permanent: true
            }
        ]
    }
};

export default nextConfig;
