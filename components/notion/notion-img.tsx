import { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { FC } from 'react'
import NotionRichText from './notion-richtext'
import Image from 'next/image'

interface Props {
	block: ImageBlockObjectResponse
}

const NotionImg: FC<Props> = ({ block }) => {
	const url =
		block.image.type === 'external'
			? block.image.external.url
			: block.image.file.url

	const caption = block.image.caption
		.map((richText) => richText.plain_text)
		.join('')

	const searchParams = new URLSearchParams(caption)
	const alt = searchParams.get('alt') || ''
	const width = Number(searchParams.get('height')) || 100
	const height = Number(searchParams.get('width')) || 100
	const align = searchParams.get('align')
	const alignClass = {
		left: 'text-left',
		center: 'text-center',
		right: 'text-right',
	}[align || '']

	return (
		<p className={alignClass}>
			<Image src={url} alt={alt} width={width} height={height} />
		</p>
	)
}

export default NotionImg
