import { Heading3BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { FC } from 'react'
import NotionRichText from './notion-richtext'

interface Props {
	block: Heading3BlockObjectResponse
}

const NotionH3: FC<Props> = ({ block }) => {
	return (
		<h3 className="text-black dark:text-white font-bold text-2xl mt-4 mb-1">
			<NotionRichText items={block.heading_3.rich_text} />
		</h3>
	)
}

export default NotionH3
