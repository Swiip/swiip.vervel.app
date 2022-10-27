import NotionBlocks from '../../components/notion/notion-blocks'
import NotionRichText from '../../components/notion/notion-richtext'
import { getBlogData } from '../../data'
import Link from 'next/link'

const Blog = async () => {
	const { content } = await getBlogData()

	return (
		<>
			<NotionBlocks blocks={content} />
			<div>
				{content
					?.filter((block) => block.type === 'child_page')
					.map((page) => {
						return (
							<Link key={page.id} href={`/blog/${page.pageProps?.slug}`}>
								<div className="flex flex-row justify-between items-center">
									<h2 className="text-black dark:text-white font-bold text-4xl mt-4 mb-1">
										{page.pageProps?.title}
									</h2>
									<span className="text-2xl">{page.pageProps?.lang?.flag}</span>
								</div>
								<p className="text-gray-600 dark:text-gray-400">
									{page.pageProps?.description && (
										<NotionRichText items={page.pageProps?.description} />
									)}
								</p>
							</Link>
						)
					})}
			</div>
		</>
	)
}

export default Blog
