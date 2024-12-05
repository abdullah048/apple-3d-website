const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/i,
      type: 'asset/resource',
    });

    return config;
  },
};

export default nextConfig;
