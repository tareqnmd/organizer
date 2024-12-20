'use client';

import useOutsideClick from '@/hooks/useOutsideClick';
import { UserType } from '@/lib/helper/profile/types';
import { getRoutes, Routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useRef, useState } from 'react';
import NavLink from '../layout/NavLink';

const Sidebar = ({ user }: { user: UserType }) => {
	const [isOpen, setIsOpen] = useState(false);
	const asideRef = useRef<HTMLElement>(null);
	useOutsideClick(asideRef, () => setIsOpen(false), true);
	return (
		<>
			{!isOpen ? (
				<button className="md:hidden" onClick={() => setIsOpen(true)}>
					<Menu />
				</button>
			) : (
				<button className="md:hidden" onClick={() => setIsOpen(false)}>
					<X />
				</button>
			)}
			<aside
				ref={asideRef}
				className={cn(
					'theme fixed bottom-0 top-[57px] w-[220px] overflow-hidden border-l bg-background-light transition-all duration-300 dark:border-slate-700 dark:bg-background-dark md:hidden',
					isOpen ? 'right-0' : '-right-[220px]',
				)}
			>
				<ul className="mx-6 my-3 flex flex-col items-start justify-center gap-2">
					{user?.role === 'admin' && (
						<li className="w-full border-b py-2 dark:border-slate-700">
							<NavLink
								exact={false}
								link={{
									name: Routes.ADMIN_NAME,
									path: Routes.ADMIN_PATH,
								}}
							/>
						</li>
					)}
					{getRoutes('modules').map((link) => (
						<li
							className="w-full border-b py-2 dark:border-slate-700"
							key={link.path}
						>
							<NavLink exact={false} link={link} />
						</li>
					))}
				</ul>
			</aside>
		</>
	);
};

export default Sidebar;
