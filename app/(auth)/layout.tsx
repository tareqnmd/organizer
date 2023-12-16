import AuthLayout from '@/components/auth/AuthLayout';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="grid h-screen place-items-center">
			<AuthLayout>{children}</AuthLayout>
		</div>
	);
};

export default Layout;
