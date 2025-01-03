'use client';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { BudgetTransactionType } from '@/lib/helper/budget';
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
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<EditIcon
					className="cursor-pointer transition-all active:scale-75"
					size={16}
				/>
			</DialogTrigger>
			<DialogContent className="basic-modal">
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
