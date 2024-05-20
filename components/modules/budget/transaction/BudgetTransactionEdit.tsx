'use client';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { BudgetTransactionType } from '@/types/modules/budget/budget-transaction-types';
import { EditIcon } from 'lucide-react';
import { useState } from 'react';
import BudgetTransactionForm from './BudgetTransactionForm';
const BudgetTransactionEdit = ({
	transaction,
}: {
	transaction: BudgetTransactionType;
}) => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild>
				<EditIcon
					className="cursor-pointer"
					size={16}
				/>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Category</DialogTitle>
				</DialogHeader>
				<BudgetTransactionForm
					setOpen={setOpen}
					transaction={transaction}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default BudgetTransactionEdit;
