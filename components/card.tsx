import { FC, ReactNode } from 'react'
import NextLink from 'next/link'
import cn from 'classnames'

interface Props {
	children: ReactNode
	href: string
	color: number
}

const Card: FC<Props> = ({ children, href, color }) => {
	return (
		<NextLink href={href}>
			<a
				className="text-lg rounded-xl p-1 magic-borders"
				style={{ '--offset': color } as any}
			>
				<div className="h-full rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
					{children}
				</div>
			</a>
		</NextLink>
	)
}

export default Card
