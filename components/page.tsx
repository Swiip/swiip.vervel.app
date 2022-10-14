import { FC, ReactNode } from 'react'
import Footer from './footer'
import Header from './header'
import cn from 'classnames'

interface Props {
	children: ReactNode
	className?: string
}

const Page: FC<Props> = ({ children, className }) => {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<Header />
			<main className={cn('flex flex-col max-w-2xl mx-auto', className)}>
				{children}
			</main>
			<Footer />
		</div>
	)
}

export default Page
