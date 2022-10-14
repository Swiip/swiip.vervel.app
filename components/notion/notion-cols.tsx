import {
	ColumnBlockObjectResponse,
	ColumnListBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { FC } from 'react'
import { Block } from '../../data/notion/types'
import NotionBlocks from './notion-blocks'

interface Props {
	block: ColumnListBlockObjectResponse
}

const NotionCols: FC<Props> = ({ block }) => {
	const colsBlock = block as Block

	if (!colsBlock.children) {
		return null
	}

	const colBlocks = colsBlock.children as ColumnBlockObjectResponse[]

	return (
		<div className="flex flex-row gap-4">
			{colBlocks.map((block) => (
				<div key={block.id} className="flex-1">
					<NotionBlocks blocks={(block as Block).children} />
				</div>
			))}
		</div>
	)
}

export default NotionCols
