import { Client, isFullBlock } from '@notionhq/client'
import {
	BlockObjectResponse,
	ChildPageBlockObjectResponse,
	Heading1BlockObjectResponse,
	Heading2BlockObjectResponse,
	Heading3BlockObjectResponse,
	ImageBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

const NOTION_KEY = 'secret_gZNAR6WBAbPPHeFGemwS3rjgnMMvAZLG9GGLTFfaMhA'
const NOTION_ROOT_ID = '302e5568d84c4ef6a67812b2d31efcdd'

const notion = new Client({ auth: NOTION_KEY })

export const getHomeData = async () => {
	// const page = await notion.pages.retrieve({
	// 	page_id: NOTION_ROOT_ID,
	// })
	const allBlocks = await notion.blocks.children.list({
		block_id: NOTION_ROOT_ID,
		page_size: 50,
	})
	const blocks = allBlocks.results.filter((block) =>
		isFullBlock(block)
	) as BlockObjectResponse[]

	const name = blocks.find((block) => block.type === 'heading_1') as
		| Heading1BlockObjectResponse
		| undefined
	const title = blocks.find((block) => block.type === 'heading_2') as
		| Heading2BlockObjectResponse
		| undefined
	const caption = blocks.find((block) => block.type === 'heading_3') as
		| Heading3BlockObjectResponse
		| undefined
	const image = blocks.find((block) => block.type === 'image') as
		| ImageBlockObjectResponse
		| undefined

	let posts: string[] = []

	const blogPage = blocks.find(
		(block) =>
			block.type === 'child_page' &&
			block.child_page.title.toLowerCase() === 'blog'
	)

	if (blogPage) {
		const allBlogBlocks = await notion.blocks.children.list({
			block_id: blogPage.id,
			page_size: 50,
		})
		const blogBlocks = allBlogBlocks.results.filter((block) =>
			isFullBlock(block)
		) as BlockObjectResponse[]
		const blogChildren = blogBlocks.filter(
			(block) => block.type === 'child_page'
		) as ChildPageBlockObjectResponse[]
		posts = blogChildren.slice(0, 3).map((blog) => blog.child_page.title)
	}

	return { name, title, caption, image, posts }
}
