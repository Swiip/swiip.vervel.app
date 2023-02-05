import { MicrophoneIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import NotionRichText from '../../components/notion/notion-richtext'
import { getContentData } from '../../data'

const Content = async () => {
	const contents = await getContentData()

	return (
		<>
			<h1 className="font-bold text-4xl mb-12 text-black dark:text-white">
				All my published contents
			</h1>
			<div className="flex flex-col gap-16">
				{contents.map((content) => (
					<section key={content.id}>
						<Link href={content.url} target="_blank">
							<h2 className="flex flex-row gap-8 text-black dark:text-white font-bold text-3xl">
								{content.type === 'post' ? (
									<PencilSquareIcon className="h-8 w-8" />
								) : (
									<MicrophoneIcon className="h-8 w-8 shrink-0" />
								)}
								<NotionRichText items={content.name} />
							</h2>
							<div className="flex flex-row gap-8 mt-4">
								<p className="flex-1 truncate underline text-gray-600 dark:text-gray-400 text-ellipsis">
									{content.url}
								</p>
								<p className="text-gray-600 dark:text-gray-400">
									{content.date.toLocaleDateString()}
									<span className="ml-4">
										{content.lang === 'EN' ? '🇬🇧' : '🇫🇷'}
									</span>
								</p>
							</div>
						</Link>
					</section>
				))}
			</div>
		</>
	)
}

export default Content
