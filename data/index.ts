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
	const rootBlocks = await fetchBlocks()
	const bioPage = findPage(rootBlocks, 'bio')

	if (!bioPage) {
		return {}
	}

	const content = await fetchBlocks(bioPage.id, true)

	return { content }
}

export const getBlogData = async () => {
	const rootBlocks = await fetchBlocks()
	const blogPage = findPage(rootBlocks, 'blog')

	if (!blogPage) {
		return {}
	}

	const content = await fetchBlocks(blogPage.id, true)
	let posts = filterBlocksOfType(content, 'child_page')
	posts = await fetchPagesMetadata(posts)

	return { content, posts }
}

export const getPostData = async (slug: string) => {
	console.log('slug', slug)

	const rootBlocks = await fetchBlocks()
	const blogPage = findPage(rootBlocks, 'blog')

	console.log('blogPage', blogPage)

	if (!blogPage) {
		return {}
	}

	const blogBlocks = await fetchBlocks(blogPage.id)
	const post = findPage(blogBlocks, slug)

	const content = await fetchBlocks(post?.id)

	return { post, content }
}
