import { isFullBlock } from '@notionhq/client'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import slugify from 'slugify'
import { notion, NOTION_ROOT_ID } from './common'
import { BlockType, NewBlock, PageBlock } from './types'

const parseBlock = (block: BlockObjectResponse): NewBlock | undefined => {
	const { id, type } = block
	if (type === 'heading_1') {
		return { id, type, text: block.heading_1.rich_text }
	}
	if (type === 'heading_2') {
		return { id, type, text: block.heading_2.rich_text }
	}
	if (type === 'heading_3') {
		return { id, type, text: block.heading_3.rich_text }
	}
	if (type === 'paragraph') {
		return { id, type, text: block.paragraph.rich_text }
	}
	if (type === 'image') {
		const { image } = block
		const url = image.type === 'external' ? image.external.url : image.file.url
		const caption = image.caption
			.map((richText) => richText.plain_text)
			.join('')
		const searchParams = new URLSearchParams(caption)
		const alt = searchParams.get('alt') || undefined
		const width = Number(searchParams.get('height')) || 100
		const height = Number(searchParams.get('width')) || 100
		const align = searchParams.get('align') || undefined
		return { id, type, url, alt, width, height, align }
	}
	if (type === 'child_page') {
		const { title } = block.child_page
		return { id, type, title, slug: slugify(title) }
	}
}

export const fetchBlocks = async (
	parentId = NOTION_ROOT_ID,
	recursive = false
): Promise<NewBlock[]> => {
	const allBlocks = await notion.blocks.children.list({
		block_id: parentId,
		page_size: 50,
	})

	const blocks = allBlocks.results.filter((block) =>
		isFullBlock(block)
	) as BlockObjectResponse[]

	const newBlocks: NewBlock[] = []

	for (const block of blocks) {
		const newBlock = parseBlock(block)
		if (newBlock) {
			newBlocks.push(newBlock)
			if (recursive && block.has_children && block.type !== 'child_page') {
				newBlock.children = await fetchBlocks(newBlock?.id, true)
			}
		}
	}

	return newBlocks
}

export const filterBlocksOfType = <Type extends BlockType>(
	blocks: NewBlock[],
	type: Type
): (NewBlock & { type: Type })[] => {
	return blocks.filter(
		(block): block is NewBlock & { type: Type } => block.type === type
	)
}

export const findBlockOfType = <Type extends BlockType>(
	blocks: NewBlock[],
	type: Type
) => {
	return filterBlocksOfType(blocks, type)[0] as
		| (NewBlock & { type: Type })
		| undefined
}

export const findPage = (blocks: NewBlock[], title: string) => {
	return blocks.find(
		(block) =>
			block.type === 'child_page' && block.title.toLowerCase() === title
	)
}

export const fetchPageMetadata = async (block: PageBlock) => {
	const comments = await notion.comments.list({
		block_id: block.id,
		page_size: 50,
	})

	const result: PageBlock = { ...block }

	comments.results.forEach((comment) => {
		if (['🇫🇷', '🇬🇧'].includes(comment.rich_text[0].plain_text)) {
			if (comment.rich_text[0].plain_text === '🇫🇷') {
				result.lang = { key: 'fr', flag: '🇫🇷' }
			}
			if (comment.rich_text[0].plain_text === '🇬🇧') {
				result.lang = { key: 'en', flag: '🇬🇧' }
			}
		} else {
			result.description = comment.rich_text
		}
	})

	return result
}

export const fetchPagesMetadata = async (blocks: PageBlock[]) => {
	let results: PageBlock[] = []

	for (const block of blocks) {
		results.push(await fetchPageMetadata(block))
	}

	return results
}
