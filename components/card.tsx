import { FC, ReactNode } from 'react'
import NextLink from 'next/link'
import cn from 'classnames'

interface Props {
	children: ReactNode
	color: number
}

const Card: FC<Props> = ({ children, color }) => {
	return (
		<NextLink href="/blog/1">
			<a
				className={cn(
					'text-lg rounded-xl p-1 bg-gradient-to-br via-transparent to-transparent hover:from-transparent hover:via-transparent',
					color === 0 && 'from-red-600 hover:to-red-600',
					color === 1 && 'from-green-600 hover:to-green-600',
					color === 2 && 'from-blue-600 hover:to-blue-600'
				)}
			>
				<div className="h-full rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
					{children}
				</div>
			</a>
		</NextLink>
	)
}

export default Card
