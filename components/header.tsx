import NavItem from './nav-item'
import DarkModeToggle from './dark-mode-toggle'

const Header = () => {
	return (
		<header className="flex flex-row justify-between max-w-2xl mx-auto pt-8 pb-16">
			<nav className="flex flex-row gap-4">
				<NavItem href="/">Home</NavItem>
				<NavItem href="/bio">Bio</NavItem>
				<NavItem href="/content">Content</NavItem>
			</nav>
			<DarkModeToggle />
		</header>
	)
}

export default Header
