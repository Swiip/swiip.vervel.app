import cn from 'classnames'
import {
	AllHTMLAttributes,
	forwardRef,
	ForwardRefRenderFunction,
	ReactNode,
} from 'react'
import NextLink from 'next/link'

interface Props extends AllHTMLAttributes<HTMLAnchorElement> {
	children: ReactNode
	href: string
}

const Link: ForwardRefRenderFunction<HTMLAnchorElement, Props> = (
	{ className, ...props },
	ref
) => (
	<NextLink
		ref={ref}
		className={cn(
			'underline text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-all',
			className
		)}
		{...props}
	/>
)

export default forwardRef(Link)
