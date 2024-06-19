'use client';
import { useDebounce } from '@/hooks/useDebounce';
import { getPageNumbers, toQueryString } from '@/lib/helper/common';
import { baseDateFormat } from '@/lib/helper/date';
import { BudgetTransactionParamType } from '@/types/modules/budget/budget-transaction-types';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';
import BudgetTransactionAdd from './BudgetTransactionAdd';
import BudgetTransactionFilter from './BudgetTransactionFilter';
import BudgetTransactionPagination from './BudgetTransactionPagination';

const BudgetTransactionsWrapper = ({
	children,
	searchOptions,
}: {
	children: ReactNode;
	searchOptions: BudgetTransactionParamType;
}) => {
	const router = useRouter();
	const hasRendered = useRef(false);
	const [perPage, setPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [pages, setPages] = useState<number[]>([]);
	const [totalTransactions, setTotalTransactions] = useState(40);
	const [filterData, setFilterData] = useState({
		category: searchOptions.category ?? '',
		type: searchOptions.type ?? '',
		transaction: searchOptions.transaction ?? '',
		from: searchOptions.from ?? '',
		to: searchOptions.to ?? '',
	});
	const debouncedText = useDebounce(filterData.transaction, 500);

	const changeHandler = (value: string, name: string) => {
		setFilterData((prev) => ({ ...prev, [name]: value }));
	};

	useEffect(() => {
		if (hasRendered.current) {
			router.push(
				`/budget/transaction${toQueryString({
					type: filterData.type,
					category: filterData.category,
					transaction: debouncedText,
					from: filterData.from,
					to: filterData.to,
				})}`
			);
		} else {
			hasRendered.current = true;
		}
	}, [
		debouncedText,
		filterData.type,
		filterData.category,
		filterData.from,
		filterData.to,
		router,
	]);

	const dateRangeUpdate = (value: { from: Date; to: Date }) => {
		setFilterData((prev) => ({
			...prev,
			from: value?.from ? baseDateFormat(value.from) : '',
			to: value?.to ? baseDateFormat(value.to) : '',
		}));
	};

	useEffect(() => {
		if (totalTransactions > 0 && perPage > 0) {
			setPages(getPageNumbers(totalTransactions, perPage));
			setCurrentPage(1);
		}
	}, [totalTransactions, perPage]);

	return (
		<div className="grid gap-4">
			<div className="grid grid-cols-4 gap-2">
				<BudgetTransactionFilter
					filterData={filterData}
					onChange={changeHandler}
					onDateRangeUpdate={dateRangeUpdate}
				/>
				<BudgetTransactionAdd />
			</div>
			{children}
			<BudgetTransactionPagination
				currentPage={currentPage}
				pages={pages}
			/>
		</div>
	);
};

export default BudgetTransactionsWrapper;
