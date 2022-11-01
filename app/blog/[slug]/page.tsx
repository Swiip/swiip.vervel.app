import NotionBlocks from '../../../components/notion/notion-blocks'
import { getBlogData, getPostData } from '../../../data'
import { filterBlocksOfType } from '../../../data/notion/api'

type Props = {
	params: { slug: string }
}

const Post = async ({ params: { slug } }: Props) => {
	const { post, content } = await getPostData(slug)

	return <NotionBlocks blocks={content} />
}

export default Post

export const generateStaticParams = async () => {
	const { content } = await getBlogData()
	const pages = filterBlocksOfType(content || [], 'child_page')
	return pages.map((page) => ({ slug: page.slug }))
}
