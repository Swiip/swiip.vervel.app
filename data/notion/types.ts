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
	| 'child_database'

export type AbstractBlock = {
	id: string
	type: BlockType
}

export type TextBlock = AbstractBlock & { text: RichText }

export type WithChildrenBlock = AbstractBlock & {
	children?: Block[]
	hasChildren: boolean
}

export type HeadingBlock = TextBlock &
	WithChildrenBlock & { toggleable: boolean }

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
	imageType?: 'light' | 'dark'
}

export type LiBlock = TextBlock & {
	type: 'bulleted_list_item'
}

export type ColsBlock = Omit<WithChildrenBlock, 'children'> & {
	type: 'column_list'
	children?: ColBlock[]
}

export type ColBlock = WithChildrenBlock & {
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

export type DatabaseBlock = AbstractBlock & {
	type: 'child_database'
	title: string
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
	| DatabaseBlock

export type Sort = {
	property: string
	direction: 'ascending' | 'descending'
}

export type Content = {
	id: string
	type: 'post' | 'conference'
	name: RichText
	date: Date
	lang: 'EN' | 'FR'
	url: string
}
