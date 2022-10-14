import NextLink from 'next/link'
import Link from './link'

const Footer = () => {
	return (
		<footer className="flex flex-col pt-8 max-w-2xl mx-auto">
			<hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
			<div className="w-full grid grid-cols-2 gap-4 pb-16">
				<div className="flex flex-col gap-4">
					<NextLink href="/">
						<Link>Home</Link>
					</NextLink>
					<NextLink href="/bio">
						<Link>Bio</Link>
					</NextLink>
					<NextLink href="/blog">
						<Link>Blog</Link>
					</NextLink>
					<NextLink href="/conf">
						<Link>Conferences</Link>
					</NextLink>
				</div>
				<div className="flex flex-col gap-4 items-end">
					<Link
						href="https://twitter/swiip"
						target="_blank"
						rel="noopener noreferer"
					>
						Twitter
					</Link>
					<Link
						href="https://github.com/swiip"
						target="_blank"
						rel="noopener noreferer"
					>
						Github
					</Link>
					<Link
						href="https://www.linkedin.com/in/swiip/"
						target="_blank"
						rel="noopener noreferer"
					>
						LinkedIn
					</Link>
				</div>
			</div>
		</footer>
	)
}

export default Footer
