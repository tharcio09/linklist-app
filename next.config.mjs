/** @type {import('next').NextConfig} */
const nextConfig = {
  // Esta configuração desabilita o cache de arquivos do Webpack,
  // que é o que está causando o erro 'ENOENT'.
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

export default nextConfig;