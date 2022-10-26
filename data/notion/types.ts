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
