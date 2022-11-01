import { FC } from 'react'
import { ParagraphBlock } from '../../data/notion/types'
import NotionRichText from './notion-richtext'

interface Props {
	block: ParagraphBlock
}

const NotionP: FC<Props> = ({ block }) => {
	return (
		<p className="text-gray-700 dark:text-gray-200 mt-1 mb-1">
			<NotionRichText items={block.text} />
		</p>
	)
}

export default NotionP
