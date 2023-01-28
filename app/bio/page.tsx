import NotionBlocks from '../../components/notion/notion-blocks'
import { getBioData } from '../../data'

const Bio = async () => {
	const { content } = await getBioData()

	return <NotionBlocks blocks={content} />
}

export default Bio
