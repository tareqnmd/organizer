import { BudgetTypeType } from '@/helper/modules/budget';
import {
	generateDataFromServer,
	nextProperties,
} from '@/helper/shared/server-fetch';
import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import BudgetType from './BudgetType';
import { BudgetTypeAdd } from './BudgetTypeAdd';

const BudgetTypes = async ({}) => {
	const { data: types } = await generateDataFromServer(
		'budget/types',
		nextProperties({})
	);
	const session = await getServerSession(authOptions);
	return (
		<>
			{session?.user?.role === 'admin' && (
				<div className="flex justify-end gap-2 mb-3">
					<BudgetTypeAdd />
				</div>
			)}
			<div
				className="grid grid-cols-1 sm:grid-cols-2
			 lg:grid-cols-3 xl:grid-cols-4 gap-2"
			>
				{types?.map((type: BudgetTypeType) => (
					<BudgetType
						key={type.id}
						type={type}
						admin={session?.user?.role === 'admin'}
					/>
				))}
			</div>
		</>
	);
};

export default BudgetTypes;
