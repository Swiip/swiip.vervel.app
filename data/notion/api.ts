import { Client, isFullBlock } from '@notionhq/client'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import slugify from 'slugify'
import { parseBlock } from './mapping'
import { BlockType, Block, PageBlock } from './types'

const NOTION_KEY = process.env.NOTION_KEY

export const NOTION_ROOT_ID = process.env.NOTION_ROOT_ID || ''

export const notion = new Client({ auth: NOTION_KEY })

export const fetchBlocks = async (
	parentId = NOTION_ROOT_ID,
	recursive = false
): Promise<Block[]> => {
	const allBlocks = await notion.blocks.children.list({
		block_id: parentId,
		page_size: 50,
	})

	const blocks = allBlocks.results.filter(
		(block): block is BlockObjectResponse => isFullBlock(block)
	)

	const newBlocks: Block[] = []

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
	blocks: Block[],
	type: Type
): (Block & { type: Type })[] => {
	return blocks.filter(
		(block): block is Block & { type: Type } => block.type === type
	)
}

export const findBlockOfType = <Type extends BlockType>(
	blocks: Block[],
	type: Type
) => {
	return filterBlocksOfType(blocks, type)[0] as
		| (Block & { type: Type })
		| undefined
}

export const findPage = (blocks: Block[], slug: string) => {
	return blocks.find(
		(block) =>
			block.type === 'child_page' && slugify(block.title.toLowerCase()) === slug
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
