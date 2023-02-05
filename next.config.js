/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['s3.us-west-2.amazonaws.com'],
		dangerouslyAllowSVG: true,
	},
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ['@notionhq/client'],
	},
}

module.exports = nextConfig
