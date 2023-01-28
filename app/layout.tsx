import Provider from '../components/provider'
import { FC, ReactNode } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { ServerThemeProvider } from '@wits/next-themes'

import '../styles/globals.css'
import '../styles/borders.css'

type Props = {
	children: ReactNode
}

const RootLayout: FC<Props> = ({ children }) => {
	return (
		<ServerThemeProvider attribute="class">
			<html>
				<head>
					<title>Matthieu (Swiip) Lux</title>
				</head>
				<body>
					<Provider>
						<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
							<Header />
							<main className="flex flex-col max-w-2xl mx-auto">
								{children}
							</main>
							<Footer />
						</div>
					</Provider>
				</body>
			</html>
		</ServerThemeProvider>
	)
}

export default RootLayout
