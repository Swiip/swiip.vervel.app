import {
	Heading1BlockObjectResponse,
	Heading2BlockObjectResponse,
	Heading3BlockObjectResponse,
	ImageBlockObjectResponse,
	ParagraphBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { getAllBlocks, getRecursiveAllBlocks } from './notion/blocks'
import { getPageFromBlocks } from './notion/pages'
import { PageProps } from './notion/types'

export const getHomeData = async () => {
	const blocks = await getAllBlocks()

	const name = blocks.find((block) => block.type === 'heading_1') as
		| Heading1BlockObjectResponse
		| undefined
	const title = blocks.find((block) => block.type === 'heading_2') as
		| Heading2BlockObjectResponse
		| undefined
	const caption = blocks.find((block) => block.type === 'heading_3') as
		| Heading3BlockObjectResponse
		| undefined
	const image = blocks.find((block) => block.type === 'image') as
		| ImageBlockObjectResponse
		| undefined
	const content = blocks.find((block) => block.type === 'paragraph') as
		| ParagraphBlockObjectResponse
		| undefined

	let posts: PageProps[] = []

	const blogPage = getPageFromBlocks(blocks, 'blog')

	if (blogPage) {
		const blogBlocks = await getRecursiveAllBlocks(blogPage.id)

		posts = blogBlocks
			.filter((block) => block.type === 'child_page')
			.map((block) => block.pageProps as PageProps)
	}

	return { name, title, caption, image, posts, content }
}

export const getBioData = async () => {
	const rootBlocks = await getAllBlocks()
	const bioPage = getPageFromBlocks(rootBlocks, 'bio')

	if (!bioPage) {
		return { content: undefined }
	}

	const content = await getRecursiveAllBlocks(bioPage.id)

	return { content }
}

export const getBlogData = async () => {
	const rootBlocks = await getAllBlocks()
	const blogPage = getPageFromBlocks(rootBlocks, 'blog')

	if (!blogPage) {
		return { content: undefined }
	}

	const blocks = await getRecursiveAllBlocks(blogPage.id)

	return { content: blocks }
}
