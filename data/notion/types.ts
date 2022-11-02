import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

export type RichText = RichTextItemResponse[]

export type BlockType =
	| 'heading_1'
	| 'heading_2'
	| 'heading_3'
	| 'paragraph'
	| 'image'
	| 'bulleted_list_item'
	| 'column_list'
	| 'column'
	| 'child_page'

export type AbstractBlock = {
	id: string
	type: BlockType
	children?: Block[]
}

export type TextBlock = AbstractBlock & { text: RichText }
export type HeadingBlock = TextBlock & { toggleable: boolean }

export type Heading1Block = HeadingBlock & { type: 'heading_1' }
export type Heading2Block = HeadingBlock & { type: 'heading_2' }
export type Heading3Block = HeadingBlock & { type: 'heading_3' }

export type ParagraphBlock = TextBlock & { type: 'paragraph' }

export type ImageBlock = AbstractBlock & {
	type: 'image'
	url: string
	alt?: string
	width: number
	height: number
	align?: string
}

export type LiBlock = TextBlock & {
	type: 'bulleted_list_item'
}

export type ColsBlock = AbstractBlock & {
	type: 'column_list'
	children?: ColBlock[]
}

export type ColBlock = AbstractBlock & {
	type: 'column'
}

export type PageBlock = AbstractBlock & {
	type: 'child_page'
	title: string
	slug: string
	lang?: { key: 'fr' | 'en'; flag: '🇫🇷' | '🇬🇧' }
	date?: string
	description?: RichText
}

export type Block =
	| Heading1Block
	| Heading2Block
	| Heading3Block
	| ParagraphBlock
	| ImageBlock
	| LiBlock
	| ColsBlock
	| ColBlock
	| PageBlock
