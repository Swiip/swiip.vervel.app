import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { FC, ReactNode } from 'react'

interface Props {
	href: string
	children: ReactNode
}

const NavItem: FC<Props> = ({ href, children }) => {
	const router = useRouter()
	const isActive = router.asPath === href

	return (
		<Link
			href={href}
			className={cn(
				isActive
					? 'font-semibold text-gray-800 dark:text-gray-200'
					: 'font-normal text-gray-600 dark:text-gray-400',
				'rounded-lg px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all'
			)}
		>
			<span className="capsize">{children}</span>
		</Link>
	)
}

export default NavItem
