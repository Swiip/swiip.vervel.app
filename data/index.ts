import { Content } from './notion/types'
import {
	fetchBlocks,
	filterBlocksOfType,
	findBlockOfType,
	findDatabase,
	findPage,
} from './notion/blocks'
import { fetchDatabase } from './notion/databases'

export const getHomeData = async () => {
	const blocks = await fetchBlocks()
	const name = findBlockOfType(blocks, 'heading_1')
	const title = findBlockOfType(blocks, 'heading_2')
	const caption = findBlockOfType(blocks, 'heading_3')
	const image = findBlockOfType(blocks, 'image')
	const content = filterBlocksOfType(blocks, 'paragraph')

	const contentDatabase = findDatabase(blocks, 'content')

	let featured: Content[] = []

	if (contentDatabase) {
		featured = await fetchDatabase(
			contentDatabase.id,
			[{ property: 'Date', direction: 'descending' }],
			3
		)
	}

	return { name, title, caption, image, content, featured }
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

export const getContentData = async () => {
	const rootBlocks = await fetchBlocks()
	const database = findDatabase(rootBlocks, 'content')

	if (!database) {
		return []
	}

	const contents = await fetchDatabase(database.id, [
		{ property: 'Date', direction: 'descending' },
	])

	return contents
}
