/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // El registro ya no es paso del recorrido; este enlace se compartió y no debe dar 404.
      {
        source: "/demo/recorrido/proveedor/registro",
        destination: "/demo/recorrido/proveedor/catalogo",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
