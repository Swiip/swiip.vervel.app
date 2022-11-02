import NotionBlocks from '../../../components/notion/notion-blocks'
import NotionHeading from '../../../components/notion/notion-heading'
import { getBlogData, getPostData } from '../../../data'
import { filterBlocksOfType } from '../../../data/notion/api'
import { Heading1Block, RichText } from '../../../data/notion/types'

type Props = {
	params: { slug: string }
}

const Post = async ({ params: { slug } }: Props) => {
	const { post, content } = await getPostData(slug)
	const h1: Heading1Block = {
		id: post?.id || '',
		type: 'heading_1',
		toggleable: false,
		text: [{ plain_text: post?.title || '', annotations: {} }] as RichText,
	}

	return (
		<>
			<NotionHeading block={h1} />
			<NotionBlocks blocks={content} />
		</>
	)
}

export default Post

export const generateStaticParams = async () => {
	const { content } = await getBlogData()
	const pages = filterBlocksOfType(content || [], 'child_page')
	return pages.map((page) => ({ slug: page.slug }))
}
