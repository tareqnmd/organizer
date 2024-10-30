import { BudgetDashboardSearchParamsType } from '@/lib/helper/budget';
import { generateDataFromServer, nextProperties } from '@/lib/utils';
import BudgetFilter from './BudgetFilter';
import BudgetHistory from './history/BudgetHistory';
import BudgetOverview from './overview/BudgetOverview';

const Budget = async ({
	searchParams = {},
}: {
	searchParams?: BudgetDashboardSearchParamsType;
}) => {
	const queryParams = new URLSearchParams(searchParams);
	const url = `budget?${queryParams}`;
	const { data: budget = {} } = await generateDataFromServer(
		url,
		nextProperties({}),
	);
	const { overview = {}, history = {} } = budget;

	return (
		<div className="flex flex-col gap-4">
			<div className="grid justify-end">
				<BudgetFilter searchParams={searchParams} />
			</div>
			<BudgetOverview overview={overview} />
			<BudgetHistory history={history} searchParams={searchParams} />
		</div>
	);
};

export default Budget;
