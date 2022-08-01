import type { NextPage, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Header from '../components/header'
import { getHomeData } from '../notion/notion'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	name,
	title,
	caption,
	image,
	posts,
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
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<Header />
			<main className="flex flex-col gap-16 max-w-2xl mx-auto">
				<div className="flex flex-row gap-8">
					<div className="flex flex-col">
						<h1 className="font-bold text-4xl mb-1 text-black dark:text-white">
							{nameValue}
						</h1>
						<h2 className="text-gray-700 dark:text-gray-200 mb-4">
							{titleValue}
						</h2>
						<p className="text-gray-600 dark:text-gray-400">{captionValue}</p>
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
					<h1 className="font-bold text-4xl mb-1 text-black dark:text-white">
						Featured Posts
					</h1>
				</div>
			</main>
			<footer></footer>
		</div>
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
