import {
	ChildPageBlockObjectResponse,
	CommentObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import slugify from 'slugify'
import { notion } from './common'
import { Block, PageProps } from './types'

export const getAllComments = async (blockId: string) => {
	const allComments = await notion.comments.list({
		block_id: blockId,
		page_size: 50,
	})

	return allComments.results
}

export const getPageProps = (block: Block) => {
	const title = (block as ChildPageBlockObjectResponse).child_page.title
	const slug = slugify(title)

	const pageProps: PageProps = { title, slug }

	block.comments?.forEach((comment) => {
		if (['🇫🇷', '🇬🇧'].includes(comment.rich_text[0].plain_text)) {
			if (comment.rich_text[0].plain_text === '🇫🇷') {
				pageProps.lang = { key: 'fr', flag: '🇫🇷' }
			}
			if (comment.rich_text[0].plain_text === '🇬🇧') {
				pageProps.lang = { key: 'en', flag: '🇬🇧' }
			}
		} else {
			pageProps.description = comment.rich_text
		}
	})

	return pageProps
}
