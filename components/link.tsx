import cn from 'classnames'
import {
	AnchorHTMLAttributes,
	forwardRef,
	ForwardRefRenderFunction,
} from 'react'

const Link: ForwardRefRenderFunction<
	HTMLAnchorElement,
	AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ className, ...props }, ref) => (
	<a
		ref={ref}
		className={cn(
			'underline text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-all',
			className
		)}
		{...props}
	></a>
)

export default forwardRef(Link)
