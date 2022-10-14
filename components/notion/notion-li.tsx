import {
	BulletedListItemBlockObjectResponse,
	ParagraphBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { FC } from 'react'
import NotionRichText from './notion-richtext'

interface Props {
	block: BulletedListItemBlockObjectResponse
}

const NotionLi: FC<Props> = ({ block }) => {
	return (
		<li className="text-gray-700 dark:text-gray-200 mt-1 mb-1">
			<NotionRichText items={block.bulleted_list_item.rich_text} />
		</li>
	)
}

export default NotionLi
