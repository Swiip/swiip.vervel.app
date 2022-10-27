import Provider from '../components/provider'
import { FC, ReactNode } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'

import '../styles/globals.css'
import '../styles/borders.css'

type Props = {
	children: ReactNode
}

const RootLayout: FC<Props> = ({ children }) => {
	return (
		<html>
			<head>
				<title>Swiip</title>
			</head>
			<body>
				<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
					<Header />
					<main className="flex flex-col max-w-2xl mx-auto">
						<Provider>{children}</Provider>
					</main>
					<Footer />
				</div>
			</body>
		</html>
	)
}

export default RootLayout
