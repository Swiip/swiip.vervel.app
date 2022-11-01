import { FC } from 'react'
import { ColsBlock } from '../../data/notion/types'
import NotionBlocks from './notion-blocks'

interface Props {
	block: ColsBlock
}

const NotionCols: FC<Props> = ({ block }) => {
	if (!block.children) {
		return null
	}

	const colBlocks = block.children

	return (
		<div className="flex flex-row gap-4">
			{colBlocks.map((block) => (
				<div key={block.id} className="flex-1">
					<NotionBlocks blocks={block.children} />
				</div>
			))}
		</div>
	)
}

export default NotionCols
