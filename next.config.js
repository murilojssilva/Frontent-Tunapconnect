/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'sass', 'styles')],
  },
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
}

module.exports = nextConfig

// module.exports = withSass({
//   cssModules: true,
//   // cssLoaderOptions: {
//   //   importLoaders: 1,
//   //   localIdentName: '[local]___[hash:base64:5]',
//   // },
// })

// module.exports = {
//   reactStrictMode: true,
//   sassOptions: {
//     includePaths: [path.join(__dirname, 'styles')],
//   },
// }
