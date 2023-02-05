import { isFullBlock } from '@notionhq/client'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import slugify from 'slugify'
import { notion, NOTION_ROOT_ID } from './client'
import { parseBlock } from './mapping'
import {
	BlockType,
	Block,
	PageBlock,
	WithChildrenBlock,
	DatabaseBlock,
} from './types'

export const fetchBlocks = async (
	parentId = NOTION_ROOT_ID,
	recursive = false
): Promise<Block[]> => {
	const allBlocks = await notion.blocks.children.list({
		block_id: parentId,
		page_size: 50,
	})

	const blocks = allBlocks.results.filter(
		(block): block is BlockObjectResponse =>
			isFullBlock(block) || ('type' in block && block.type === 'child_database')
	)

	const newBlocks: Block[] = []

	for (const block of blocks) {
		const newBlock = parseBlock(block)
		if (newBlock) {
			newBlocks.push(newBlock)
			if (recursive && 'hasChildren' in newBlock && newBlock.hasChildren) {
				const blocks = await fetchBlocks(newBlock?.id, true)
				;(newBlock as WithChildrenBlock).children = blocks
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
		(block): block is PageBlock =>
			block.type === 'child_page' && slugify(block.title.toLowerCase()) === slug
	)
}

export const findDatabase = (blocks: Block[], slug: string) => {
	return blocks.find(
		(block): block is DatabaseBlock =>
			block.type === 'child_database' &&
			slugify(block.title.toLowerCase()) === slug
	)
}
