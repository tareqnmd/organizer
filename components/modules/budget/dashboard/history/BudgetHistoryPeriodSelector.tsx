'use client';

import SkeletonWrapper from '@/components/common/SkeletonWrapper';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Period, TimeFrame } from '@/types';
import BudgetHistoryMonthSelector from './BudgetHistoryMonthSelector';
import BudgetHistoryYearSelector from './BudgetHistoryYearSelector';

interface Props {
	period: Period;
	setPeriod: (period: Period) => void;
	timeFrame: TimeFrame;
	setTimeFrame: (timeFrame: TimeFrame) => void;
}

const BudgetHistoryPeriodSelector = ({
	period,
	setPeriod,
	timeFrame,
	setTimeFrame,
}: Props) => {
	const historyPeriods = { data: [] };

	return (
		<div className="flex flex-wrap items-center gap-4">
			<SkeletonWrapper
				isLoading={false}
				fullWidth={false}
			>
				<Tabs
					value={timeFrame}
					onValueChange={(value: string) => setTimeFrame(value as TimeFrame)}
				>
					<TabsList>
						<TabsTrigger value="year">Year</TabsTrigger>
						<TabsTrigger value="month">Month</TabsTrigger>
					</TabsList>
				</Tabs>
			</SkeletonWrapper>
			<div className="flex flex-wrap items-center gap-2">
				<SkeletonWrapper
					isLoading={false}
					fullWidth={false}
				>
					<BudgetHistoryYearSelector
						period={period}
						setPeriod={setPeriod}
						years={historyPeriods.data || []}
					/>
				</SkeletonWrapper>
				{timeFrame === 'month' && (
					<SkeletonWrapper
						isLoading={false}
						fullWidth={false}
					>
						<BudgetHistoryMonthSelector
							period={period}
							setPeriod={setPeriod}
						/>
					</SkeletonWrapper>
				)}
			</div>
		</div>
	);
};

export default BudgetHistoryPeriodSelector;
