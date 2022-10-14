import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { getAllBlocks, getRecursiveAllBlocks } from './notion/blocks'
import { getPageFromBlocks } from './notion/pages'

export const getBioData = async () => {
	const rootBlocks = await getAllBlocks()
	const bioPage = getPageFromBlocks(rootBlocks, 'bio')

	if (!bioPage) {
		return { content: undefined }
	}

	const content = await getRecursiveAllBlocks(bioPage.id)

	return { content }
}
