import { authOptions } from '@/lib/auth-options';
import { ChildrenType } from '@/lib/helper/shared';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import LargeLogo from '../core/LargeLogo';
import { ModeToggle } from '../core/nav/ModeToggle';
import { Card } from '../ui/card';

const AuthRootLayout = async ({ children }: ChildrenType) => {
	const session = await getServerSession(authOptions);
	if (session?.user?.email) {
		return redirect('/');
	}
	return (
		<>
			<div className="fixed right-4 top-4">
				<ModeToggle />
			</div>
			<Card className="auth-card">
				<div className="flex flex-col items-center gap-1">
					<LargeLogo />
					<div className="grid w-full place-items-center gap-3">
						{children}
					</div>
				</div>
			</Card>
		</>
	);
};

export default AuthRootLayout;