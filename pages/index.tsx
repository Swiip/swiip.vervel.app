import Link from 'next/link'
import type { NextPage, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Card from '../components/card'
import { getHomeData } from '../data'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Page from '../components/page'
import NotionRichText from '../components/notion/notion-richtext'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	name,
	title,
	caption,
	image,
	posts,
	content,
}) => {
	// console.log('pageProps', { name, title, caption, image })

	const nameValue = name?.heading_1.rich_text
		.map((richText) => richText.plain_text)
		.join('')

	const titleValue = title?.heading_2.rich_text
		.map((richText) => richText.plain_text)
		.join('')

	const captionValue = caption?.heading_3.rich_text
		.map((richText) => richText.plain_text)
		.join('')

	const imageAlt =
		image?.image.caption.map((richText) => richText.plain_text).join('') || ''
	const imageUrl = image?.image.type === 'file' ? image.image.file.url : ''

	return (
		<Page className="gap-16">
			<div className="flex flex-row gap-8">
				<div className="flex flex-col">
					<h1 className="text-black dark:text-white font-bold text-5xl mb-1">
						<NotionRichText items={name?.heading_1.rich_text} />
					</h1>
					<h2 className="text-gray-700 dark:text-gray-200 mb-4">
						<NotionRichText items={title?.heading_2.rich_text} />
					</h2>
					<p className="text-gray-600 dark:text-gray-400">
						<NotionRichText items={caption?.heading_3.rich_text} />
					</p>
				</div>
				<div className="w-[176px] relative mb-0 mr-auto">
					<Image
						alt={imageAlt}
						height={176}
						width={176}
						src={imageUrl}
						sizes="30vw"
						priority
						className="rounded-3xl"
					/>
				</div>
			</div>
			<div className="flex flex-col">
				<h2 className="font-bold text-4xl mb-6 text-black dark:text-white">
					Featured Posts
				</h2>
				<div className="grid grid-cols-3 gap-8">
					{posts.map((post, i) => (
						<Card key={post.slug} href={`/blog/${post.slug}`} color={i}>
							{post.title}
						</Card>
					))}
				</div>
				<Link
					href="/blog"
					className="flex underline mt-8 text-gray-600 dark:text-gray-400 leading-7 hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6"
				>
					Read all posts <ChevronRightIcon className="h-6 w-6 ml-1" />
				</Link>
			</div>
			<p className="text-gray-600 dark:text-gray-400">
				<NotionRichText items={content?.paragraph.rich_text} />
			</p>
		</Page>
	)
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
	// const notion = new Client({ auth: NOTION_KEY })
	// const page = await notion.pages.retrieve({
	// 	page_id: NOTION_ROOT_ID,
	// })
	// const allBlocks = await notion.blocks.children.list({
	// 	block_id: NOTION_ROOT_ID,
	// 	page_size: 50,
	// })
	// const blocks = allBlocks.results.filter(
	// 	(block) => (block as any).type !== 'child_page'
	// )

	return {
		props: await getHomeData(),
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every 10 seconds
		revalidate: 10, // In seconds
	}
}

export default Home
