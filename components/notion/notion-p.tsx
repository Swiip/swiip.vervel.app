import { ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { FC } from 'react'
import NotionRichText from './notion-richtext'

interface Props {
	block: ParagraphBlockObjectResponse
}

const NotionP: FC<Props> = ({ block }) => {
	return (
		<p className="text-gray-700 dark:text-gray-200 mt-1 mb-1">
			<NotionRichText items={block.paragraph.rich_text} />
		</p>
	)
}

export default NotionP
