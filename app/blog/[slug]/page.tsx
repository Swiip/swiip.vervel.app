import { getBlogData } from '../../../data'

type Props = {
	params: { slug: string }
}

const Post = async ({ params: { slug } }: Props) => {
	return 'coucou' + slug
}

export default Post

export const generateStaticParams = async () => {
	const { content } = await getBlogData()

	return content
		?.filter((block) => block.type === 'child_page')
		.map((page) => ({ slug: page.pageProps?.slug }))
}
