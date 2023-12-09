import AntdProvider from '@/components/provider/AntdProvider';
import StoreProvider from '@/components/provider/StoreProvider';
import Footer from '../core/Footer';
import Navbar from '../core/Navbar';

const RootLayoutProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<AntdProvider>
			<StoreProvider>
				<div id="organizer">
					<Navbar />
					<main className="container mx-auto my-4">{children}</main>
					<Footer />
				</div>
			</StoreProvider>
		</AntdProvider>
	);
};

export default RootLayoutProvider;
