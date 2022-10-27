/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	images: {
		domains: ['s3.us-west-2.amazonaws.com'],
	},
	experimental: { appDir: true },
}

module.exports = nextConfig
