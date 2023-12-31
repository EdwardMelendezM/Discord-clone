/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images:{
    domains: [
      "utfs.io"
    ],
  },
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8v-validate",
      bufferutil: "commonjs bufferutil"
    })
    return config
  }
}

module.exports = nextConfig
