import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export const getPageFromBlocks = (
	blocks: BlockObjectResponse[],
	title: string
) => {
	const page = blocks.find(
		(block) =>
			block.type === 'child_page' &&
			block.child_page.title.toLowerCase() === title
	)

	return page
}
