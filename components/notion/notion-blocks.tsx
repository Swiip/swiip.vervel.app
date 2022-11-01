import { FC } from 'react'
import { Block } from '../../data/notion/types'
import NotionBlock from './notion-block'

interface Props {
	blocks?: Block[]
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
