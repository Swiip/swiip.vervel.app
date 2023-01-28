import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import slugify from 'slugify'
import { Block } from './types'

export const parseBlock = (block: BlockObjectResponse): Block | undefined => {
	const { id, type } = block
	if (type === 'heading_1') {
		return {
			id,
			type,
			text: block.heading_1.rich_text,
			toggleable: (block.heading_1 as any).is_toggleable,
		}
	}
	if (type === 'heading_2') {
		return {
			id,
			type,
			text: block.heading_2.rich_text,
			toggleable: (block.heading_2 as any).is_toggleable,
		}
	}
	if (type === 'heading_3') {
		return {
			id,
			type,
			text: block.heading_3.rich_text,
			toggleable: (block.heading_3 as any).is_toggleable,
		}
	}
	if (type === 'paragraph') {
		return { id, type, text: block.paragraph.rich_text }
	}
	if (type === 'image') {
		const { image } = block
		const url = image.type === 'external' ? image.external.url : image.file.url
		const caption = image.caption
			.map((richText) => richText.plain_text)
			.join('')
		const searchParams = new URLSearchParams(caption)
		const alt = searchParams.get('alt') || undefined
		const width = Number(searchParams.get('height')) || 100
		const height = Number(searchParams.get('width')) || 100
		const align = searchParams.get('align') || undefined
		return { id, type, url, alt, width, height, align }
	}
	if (type === 'bulleted_list_item') {
		return { id, type, text: block.bulleted_list_item.rich_text }
	}
	if (type === 'child_page') {
		const { title } = block.child_page
		return { id, type, title, slug: slugify(title).toLowerCase() }
	}
	if (type === 'column_list') {
		return { id, type, hasChildren: block.has_children }
	}
	if (type === 'column') {
		return { id, type, hasChildren: block.has_children }
	}
}
