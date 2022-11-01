import { FC } from 'react'
import { LiBlock } from '../../data/notion/types'
import NotionRichText from './notion-richtext'

interface Props {
	block: LiBlock
}

const NotionLi: FC<Props> = ({ block }) => {
	return (
		<li className="text-gray-700 dark:text-gray-200 mt-1 mb-1">
			<NotionRichText items={block.text} />
		</li>
	)
}

export default NotionLi
