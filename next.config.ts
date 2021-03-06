import path from 'path'

const NEXT_ASSETS_HOST = process.env.NEXT_ASSETS_HOST || '/'

module.exports = {
  webpack: function(config, options) {
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/,
        },
        use: ['@svgr/webpack'],
      },
      {
        test: /assets\/.*?\.(png|jpeg|jpg|gif)/i,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static',
              publicPath: `${NEXT_ASSETS_HOST}_next/static`,
            },
          },
        ],
      },
      {
        test: /\.graphql$/,
        exclude: /node_modules/,
        use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
      },
      {
        test: /\.graphqls$/,
        exclude: /node_modules/,
        use: ['graphql-tag/loader', 'graphql-let/schema/loader'],
      },
    ]

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(__dirname, '/'),
    }

    return config
  },
}
