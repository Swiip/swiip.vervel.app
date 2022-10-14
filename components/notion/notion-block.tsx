import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { FC } from 'react'
import NotionCols from './notion-cols'
import NotionH1 from './notion-h1'
import NotionH2 from './notion-h2'
import NotionH3 from './notion-h3'
import NotionImg from './notion-img'
import NotionLi from './notion-li'
import NotionP from './notion-p'

interface Props {
	block: BlockObjectResponse
}

const NotionBlock: FC<Props> = ({ block }) => {
	if (block.type === 'heading_1') {
		return <NotionH1 block={block} />
	}
	if (block.type === 'heading_2') {
		return <NotionH2 block={block} />
	}
	if (block.type === 'heading_3') {
		return <NotionH3 block={block} />
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
