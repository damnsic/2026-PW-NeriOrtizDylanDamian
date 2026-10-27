

const MINI_SERVIDOR_URL = 'http://localhost:4000';
// Antes decía 'http://localhost:3306' — ese es el puerto de MySQL (protocolo de base de
// datos, no HTTP), por lo que cualquier fetch a través de este rewrite fallaba siempre.
// Lo apunto a tu servidor Express real (server.js, PORT = 4000).
const BACKEND_URL = 'http://localhost:4000';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return[
            {source: '/mini/:path*', destination: `${MINI_SERVIDOR_URL}/:path*`},
            {source: '/api/:path*', destination: `${BACKEND_URL}/api/:path*`}
        ]
    }
}

export default nextConfig;
