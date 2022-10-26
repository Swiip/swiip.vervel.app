import '../styles/globals.css'
import '../styles/borders.css'

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { FC } from 'react'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<ThemeProvider attribute="class">
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default MyApp
