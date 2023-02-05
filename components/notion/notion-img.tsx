'use-client'

import { FC } from 'react'
import Image from 'next/image'
import { ImageBlock } from '../../data/notion/types'
import cn from 'classnames'

interface Props {
	block: ImageBlock
}

const NotionImg: FC<Props> = ({ block }) => {
	const alignClass = {
		left: 'flex justify-start',
		center: 'flex justify-center',
		right: 'flex justify-end',
	}[block.align || 'center']

	return (
		<p className={alignClass}>
			<Image
				src={block.url}
				alt={block.alt || ''}
				width={block.width}
				height={block.height}
				className={cn(
					block.imageType === 'light' && 'inline-block dark:hidden',
					block.imageType === 'dark' && 'hidden dark:inline-block'
				)}
				priority={false}
			/>
		</p>
	)
}

export default NotionImg
