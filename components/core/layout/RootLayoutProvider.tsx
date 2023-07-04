'use client';
import store, { persistor } from '@/app/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import RootPageLayout from './RootPageLayout';

const RootLayoutProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={store}>
			<PersistGate
				loading={null}
				persistor={persistor}
			>
				<ToastContainer />
				<RootPageLayout>{children}</RootPageLayout>
			</PersistGate>
		</Provider>
	);
};

export default RootLayoutProvider;
