'use client'
import RootLoading from '@/components/ui/loader/RootLoading';
import { getThemeState } from '@/features/theme/slice';
import useAuthCheck from '@/hooks/user/useAuthCheck';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const { authChecked, publicPath } = useAuthCheck();
	const { loading } = useSelector(getThemeState);

	if (loading) {
		return <RootLoading />;
	}

	if (!authChecked && !publicPath) {
		router.push('/login');
		return null;
	}
	if (authChecked && publicPath) {
		router.push('/');
		return null;
	}

	return <main>{children}</main>;
};

export default AuthLayout;
