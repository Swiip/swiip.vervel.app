import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { FC } from 'react'
import NotionBlock from './notion-block'

interface Props {
	blocks?: BlockObjectResponse[]
}

const NotionBlocks: FC<Props> = ({ blocks }) => {
	return (
		<>
			{blocks?.map((block) => (
				<NotionBlock key={block.id} block={block} />
			))}
		</>
	)
}

export default NotionBlocks
