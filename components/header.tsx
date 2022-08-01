import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import NavItem from './nav-item'
import { SunIcon, MoonIcon } from '@heroicons/react/outline'

const Header = () => {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => setMounted(true), [])

	const ToggleIcon = theme === 'light' ? MoonIcon : SunIcon

	return (
		<header className="flex flex-row justify-between max-w-2xl mx-auto pt-8 pb-16">
			<nav className="flex flex-row gap-4">
				<NavItem href="/">Home</NavItem>
				<NavItem href="/bio">Bio</NavItem>
				<NavItem href="/blog">Blog</NavItem>
				<NavItem href="/confs">Conferences</NavItem>
			</nav>
			<button
				aria-label="Toggle Dark Mode"
				type="button"
				className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-gray-600 flex items-center justify-center hover:ring-2 ring-gray-300 transition-all"
				onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
			>
				{mounted && (
					<ToggleIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
				)}
			</button>
		</header>
	)
}

export default Header
