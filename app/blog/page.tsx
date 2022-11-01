import NotionBlocks from '../../components/notion/notion-blocks'
import NotionRichText from '../../components/notion/notion-richtext'
import { getBlogData } from '../../data'
import Link from 'next/link'
import { PageBlock } from '../../data/notion/types'

const Blog = async () => {
	const { content, posts } = await getBlogData()

	return (
		<>
			<NotionBlocks blocks={content} />
			<div>
				{posts?.map((page) => {
					return (
						<Link key={page.id} href={`/blog/${page.slug}`}>
							<div className="flex flex-row justify-between items-center">
								<h2 className="text-black dark:text-white font-bold text-4xl mt-4 mb-1">
									{page.title}
								</h2>
								<span className="text-2xl">{page.lang?.flag}</span>
							</div>
							<p className="text-gray-600 dark:text-gray-400">
								{page.description && (
									<NotionRichText items={page.description} />
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
