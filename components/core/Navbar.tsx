import Links from './Links';
import Logo from './Logo';

const Navbar = () => {
	return (
		<nav className="sticky top-0 z-50 shadow-md bg-white transition duration-500 ">
			<div className="container py-4 mx-auto flex flex-wrap items-center justify-between">
				<Logo />
				<Links />
			</div>
		</nav>
	);
};

export default Navbar;
