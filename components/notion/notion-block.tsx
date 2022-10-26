import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { FC } from 'react'
import NotionCols from './notion-cols'
import NotionHeading from './notion-heading'
import NotionImg from './notion-img'
import NotionLi from './notion-li'
import NotionP from './notion-p'

interface Props {
	block: BlockObjectResponse
}

const NotionBlock: FC<Props> = ({ block }) => {
	if (
		block.type === 'heading_1' ||
		block.type === 'heading_2' ||
		block.type === 'heading_3'
	) {
		return <NotionHeading block={block} />
	}
	if (block.type === 'paragraph') {
		return <NotionP block={block} />
	}
	if (block.type === 'bulleted_list_item') {
		return <NotionLi block={block} />
	}
	if (block.type === 'column_list') {
		return <NotionCols block={block} />
	}
	if (block.type === 'image') {
		return <NotionImg block={block} />
	}
	return null
}

export default NotionBlock
