import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TransactionType } from '@/helper/modules/budget';
import { GetFormatterForCurrency } from '@/helper/shared/common';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const BudgetCategoryCard = ({
	data,
	type,
}: {
	type: TransactionType;
	data: any;
}) => {
	const formatter = useMemo(() => {
		return GetFormatterForCurrency('BDT');
	}, []);

	return (
		<Card className="w-full flex flex-col gap-2 p-2">
			<CardHeader className="p-0">
				<CardTitle
					className={(cn('text-lg'), data?.length === 0 ? 'text-center' : '')}
				>
					{type === 'income' ? 'Incomes' : 'Expenses'} by category
				</CardTitle>
			</CardHeader>

			<div className="flex items-center justify-between gap-2">
				{data?.length === 0 && (
					<div className="flex h-20 w-full flex-col items-center justify-center">
						No data for the selected period
						<p className="text-center text-sm text-muted-foreground">
							Try selecting a different period or try adding new{' '}
							{type === 'income' ? 'incomes' : 'expenses'}
						</p>
					</div>
				)}

				{data?.length > 0 && (
					<ScrollArea className="w-full mb-2">
						<div className="flex w-full flex-col gap-2">
							{data?.map((item: any) => {
								return (
									<div key={item.name}>
										<div className="flex flex-col gap-2">
											<div className="flex items-center justify-between">
												<span className="flex items-center ">
													{item.name}
													<span className="ml-2 text-xs text-muted-foreground">
														({item.percentage.toFixed(0)}%)
													</span>
												</span>
												<span className="text-sm">
													{formatter.format(item.amount)}
												</span>
											</div>
											<Progress
												value={item.percentage}
												indicator={type}
											/>
										</div>
									</div>
								);
							})}
						</div>
					</ScrollArea>
				)}
			</div>
		</Card>
	);
};

export default BudgetCategoryCard;
