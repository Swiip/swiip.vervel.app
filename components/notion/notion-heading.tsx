import { ChevronRightIcon } from '@heroicons/react/24/outline'
import {
	Heading1BlockObjectResponse,
	Heading2BlockObjectResponse,
	Heading3BlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { FC, useState } from 'react'
import NotionRichText from './notion-richtext'
import cn from 'classnames'
import { Collapse } from 'react-collapse'
import NotionBlocks from './notion-blocks'
import { Block } from '../../data/notion/types'

const headings: {
	[key: string]: { Tag: 'h1' | 'h2' | 'h3'; className: string }
} = {
	heading_1: {
		Tag: 'h1',
		className: 'text-black dark:text-white font-bold text-5xl mt-4 mb-1',
	},
	heading_2: {
		Tag: 'h2',
		className: 'text-black dark:text-white font-bold text-4xl mt-4 mb-1',
	},
	heading_3: {
		Tag: 'h3',
		className: 'text-black dark:text-white font-bold text-3xl mt-4 mb-1',
	},
}

interface Props {
	block:
		| Heading1BlockObjectResponse
		| Heading2BlockObjectResponse
		| Heading3BlockObjectResponse
}

const NotionHeading: FC<Props> = ({ block }) => {
	const [collapsed, setCollapsed] = useState(true)

	const { Tag, className } = headings[block.type]
	const data =
		block.type === 'heading_1'
			? block.heading_1
			: block.type === 'heading_2'
			? block.heading_2
			: block.heading_3
	const isToggleable = (data as unknown as { is_toggleable: boolean })
		.is_toggleable
	const children = (block as Block).children

	const handleClick = () => setCollapsed(!collapsed)

	return (
		<>
			<a onClick={handleClick} className={cn(isToggleable && 'cursor-pointer')}>
				<Tag className={cn('flex items-center', className)}>
					{isToggleable && (
						<ChevronRightIcon
							className={cn('inline-block w-8 h-8', !collapsed && 'rotate-90')}
						/>
					)}
					<NotionRichText items={data.rich_text} />
				</Tag>
			</a>
			{isToggleable && (
				<Collapse isOpened={!collapsed}>
					<NotionBlocks blocks={children} />
				</Collapse>
			)}
		</>
	)
}

export default NotionHeading
