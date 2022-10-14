import { Heading2BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { FC } from 'react'
import NotionRichText from './notion-richtext'

interface Props {
	block: Heading2BlockObjectResponse
}

const NotionH2: FC<Props> = ({ block }) => {
	return (
		<h2 className="text-black dark:text-white font-bold text-3xl mt-4 mb-1">
			<NotionRichText items={block.heading_2.rich_text} />
		</h2>
	)
}

export default NotionH2
