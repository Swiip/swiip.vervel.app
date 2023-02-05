import cn from 'classnames'
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
			{colBlocks.map((block, index) => (
				<div key={block.id} className={cn(index === 0 ? 'flex-1' : 'mt-8')}>
					<NotionBlocks blocks={block.children} />
				</div>
			))}
		</div>
	)
}

export default NotionCols
