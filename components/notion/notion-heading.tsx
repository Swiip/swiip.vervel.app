'use client'

import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { FC, useState } from 'react'
import NotionRichText from './notion-richtext'
import cn from 'classnames'
import { Collapse } from 'react-collapse'
import NotionBlocks from './notion-blocks'
import {
	Block,
	Heading1Block,
	Heading2Block,
	Heading3Block,
} from '../../data/notion/types'

const headings: {
	[key: string]: { Tag: 'h1' | 'h2' | 'h3'; className: string }
} = {
	heading_1: {
		Tag: 'h1',
		className: 'text-black dark:text-white font-bold text-5xl mt-8 mb-4',
	},
	heading_2: {
		Tag: 'h2',
		className: 'text-black dark:text-white font-bold text-4xl mt-8 mb-4',
	},
	heading_3: {
		Tag: 'h3',
		className: 'text-black dark:text-white font-bold text-3xl mt-8 mb-4',
	},
}

interface Props {
	block: Heading1Block | Heading2Block | Heading3Block
}

const NotionHeading: FC<Props> = ({ block }) => {
	const [collapsed, setCollapsed] = useState(true)

	const { Tag, className } = headings[block.type]

	const handleClick = () => setCollapsed(!collapsed)

	return (
		<>
			<a
				onClick={handleClick}
				className={cn(block.toggleable && 'cursor-pointer')}
			>
				<Tag className={cn('flex items-center', className)}>
					{block.toggleable && (
						<ChevronRightIcon
							className={cn('inline-block w-8 h-8', !collapsed && 'rotate-90')}
						/>
					)}
					<NotionRichText items={block.text} />
				</Tag>
			</a>
			{block.toggleable && (
				<Collapse isOpened={!collapsed}>
					<NotionBlocks blocks={block.children} />
				</Collapse>
			)}
		</>
	)
}

export default NotionHeading
