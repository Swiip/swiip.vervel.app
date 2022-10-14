import { isFullBlock } from '@notionhq/client'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { notion, NOTION_ROOT_ID } from './common'
import { Block } from './types'

export const getAllBlocks = async (parentId = NOTION_ROOT_ID) => {
	const allBlocks = await notion.blocks.children.list({
		block_id: parentId,
		page_size: 50,
	})

	const blocks = allBlocks.results.filter((block) =>
		isFullBlock(block)
	) as BlockObjectResponse[]

	return blocks
}

export const getRecursiveAllBlocks = async (parentId = NOTION_ROOT_ID) => {
	const blocks: Block[] = await getAllBlocks(parentId)

	for (const block of blocks) {
		if (block.has_children) {
			block.children = await getRecursiveAllBlocks(block.id)
		}
	}

	return blocks
}
