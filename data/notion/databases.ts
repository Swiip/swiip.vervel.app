import { isFullPage } from '@notionhq/client'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { notion } from './client'
import { parseContent } from './mapping'
import { Content, Sort } from './types'

export const fetchDatabase = async (
	id: string,
	sorts: Sort[] = [],
	pageSize?: number
): Promise<Content[]> => {
	const { results } = await notion.databases.query({
		database_id: id,
		sorts,
		page_size: pageSize,
	})

	const responses = results.filter((result): result is PageObjectResponse =>
		isFullPage(result)
	)

	const newResponses = responses
		.map(parseContent)
		.filter((content): content is Content => !!content)

	return newResponses
}
