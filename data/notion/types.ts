import {
	BlockObjectResponse,
	CommentObjectResponse,
	RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'

export type Block = BlockObjectResponse & {
	children?: Block[]
	comments?: CommentObjectResponse[]
	pageProps?: PageProps
}

export type PageProps = {
	title: string
	slug: string
	lang?: { key: 'fr' | 'en'; flag: '🇫🇷' | '🇬🇧' }
	description?: RichTextItemResponse[]
}

export type RichText = RichTextItemResponse[]

export type BlockType =
	| 'heading_1'
	| 'heading_2'
	| 'heading_3'
	| 'paragraph'
	| 'image'
	| 'child_page'

export type AbstractBlock = {
	id: string
	type: BlockType
	children?: NewBlock[]
}

export type TextBlock = AbstractBlock & { text: RichText }

export type Heading1Block = TextBlock & { type: 'heading_1' }
export type Heading2Block = TextBlock & { type: 'heading_2' }
export type Heading3Block = TextBlock & { type: 'heading_3' }
export type ParagraphBlock = TextBlock & { type: 'paragraph' }

export type ImageBlock = AbstractBlock & {
	type: 'image'
	url: string
	alt?: string
	width: number
	height: number
	align?: string
}

export type PageBlock = AbstractBlock & {
	type: 'child_page'
	title: string
	slug: string
	lang?: { key: 'fr' | 'en'; flag: '🇫🇷' | '🇬🇧' }
	description?: RichText
}

export type NewBlock =
	| Heading1Block
	| Heading2Block
	| Heading3Block
	| ParagraphBlock
	| ImageBlock
	| PageBlock

const test = (toto: NewBlock) => {
	if (toto.type === 'paragraph') {
		toto.text // works
	}
	if (toto.type === 'child_page') {
		toto.slug // works
	}
}
