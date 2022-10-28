import { getAllBlocks, getRecursiveAllBlocks } from './notion/blocks'
import { getPageFromBlocks } from './notion/pages'
import { PageBlock } from './notion/types'
import {
	fetchBlocks,
	fetchPagesMetadata,
	filterBlocksOfType,
	findBlockOfType,
	findPage,
} from './notion/api'

export const getHomeData = async () => {
	const blocks = await fetchBlocks()
	const name = findBlockOfType(blocks, 'heading_1')
	const title = findBlockOfType(blocks, 'heading_2')
	const caption = findBlockOfType(blocks, 'heading_3')
	const image = findBlockOfType(blocks, 'image')
	const content = findBlockOfType(blocks, 'paragraph')

	let posts: PageBlock[] = []

	const blogPage = findPage(blocks, 'blog')

	if (blogPage) {
		const blogBlocks = await fetchBlocks(blogPage.id, true)
		posts = filterBlocksOfType(blogBlocks, 'child_page').slice(0, 3)
		posts = await fetchPagesMetadata(posts)
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
