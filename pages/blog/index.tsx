import type { NextPage, InferGetStaticPropsType } from 'next'
import NotionBlocks from '../../components/notion/notion-blocks'
import NotionRichText from '../../components/notion/notion-richtext'
import Page from '../../components/page'
import { getBlogData } from '../../data'
import NextLink from 'next/link'

const Blog: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	content,
}) => {
	return (
		<Page>
			<NotionBlocks blocks={content} />
			<div>
				{content
					?.filter((block) => block.type === 'child_page')
					.map((page) => {
						return (
							<NextLink key={page.id} href={`/blog/${page.pageProps?.slug}`}>
								<a>
									<div className="flex flex-row justify-between items-center">
										<h2 className="text-black dark:text-white font-bold text-4xl mt-4 mb-1">
											{page.pageProps?.title}
										</h2>
										<span className="text-2xl">
											{page.pageProps?.lang?.flag}
										</span>
									</div>
									<p className="text-gray-600 dark:text-gray-400">
										{page.pageProps?.description && (
											<NotionRichText items={page.pageProps?.description} />
										)}
									</p>
								</a>
							</NextLink>
						)
					})}
			</div>
		</Page>
	)
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
	return {
		props: await getBlogData(),
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every 10 seconds
		revalidate: 10, // In seconds
	}
}

export default Blog
