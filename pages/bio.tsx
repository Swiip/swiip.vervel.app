import type { NextPage, InferGetStaticPropsType } from 'next'
import NotionBlocks from '../components/notion/notion-blocks'
import Page from '../components/page'
import { getBioData } from '../data'

const Bio: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
	content,
}) => {
	console.log('pageProps', { content })

	return (
		<Page>
			<NotionBlocks blocks={content} />
		</Page>
	)
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
	return {
		props: await getBioData(),
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every 10 seconds
		revalidate: 10, // In seconds
	}
}

export default Bio
