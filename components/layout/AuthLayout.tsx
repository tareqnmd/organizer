import { authOptions } from '@/lib/auth-options';
import { cn } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import LargeLogo from '../core/LargeLogo';
import { ModeToggle } from '../core/nav/ModeToggle';
import { Card } from '../ui/card';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getServerSession(authOptions);
	if (session?.user?.email) {
		return redirect('/');
	}
	return (
		<>
			<div className="absolute top-4 right-4">
				<ModeToggle />
			</div>
			<Card className={cn('shadow-md p-6 w-full max-w-[320px] transition-all', 'card-design')}>
				<div className="flex flex-col items-center gap-1">
					<LargeLogo />
					<div className="grid gap-3 place-items-center">{children}</div>
				</div>
			</Card>
		</>
	);
};

export default AuthLayout;
