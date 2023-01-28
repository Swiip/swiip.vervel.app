'use client'

import { ThemeProvider } from '@wits/next-themes'
import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const Provider = ({ children }: Props) => {
	return <ThemeProvider attribute="class">{children}</ThemeProvider>
}

export default Provider
