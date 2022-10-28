import { FC, ReactNode } from 'react'
import Link from 'next/link'
import cn from 'classnames'

interface Props {
	children: ReactNode
	href: string
	color: number
	className?: string
}

const Card: FC<Props> = ({ children, href, color, className }) => {
	return (
		<Link
			href={href}
			className="text-lg rounded-xl p-1 magic-borders"
			style={{ '--offset': color } as any}
		>
			<div
				className={cn(
					'h-full rounded-lg p-4 bg-gray-50 dark:bg-gray-900',
					className
				)}
			>
				{children}
			</div>
		</Link>
	)
}

export default Card
