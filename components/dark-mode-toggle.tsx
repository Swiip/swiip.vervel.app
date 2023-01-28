'use client'

import { useTheme } from '@wits/next-themes'
import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

const DarkModeToggle = () => {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => setMounted(true), [])

	const ToggleIcon = theme === 'light' ? MoonIcon : SunIcon

	return (
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
	)
}

export default DarkModeToggle
