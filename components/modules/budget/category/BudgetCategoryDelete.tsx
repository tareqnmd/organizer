'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { getError } from '@/helper/shared/common';
import { useDeleteBudgetCategoryMutation } from '@/store/features/budget/category/api';
import { BudgetCategoryType } from '@/helper/modules/budget';
import { Loader, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const BudgetCategoryDelete = ({
	category,
}: {
	category: BudgetCategoryType;
}) => {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const [deleteCategory, { isLoading, isError, isSuccess, error }] =
		useDeleteBudgetCategoryMutation();

	const deleteHandler = () => {
		deleteCategory(category.id);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Category successfully deleted');
			setOpen(false);
			router.refresh();
		} else if (isError) {
			toast.error(getError(error));
		}
	}, [error, isError, isSuccess, router]);

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild>
				<Trash
					className="cursor-pointer"
					size={16}
				/>
			</DialogTrigger>
			<DialogContent className="basic-modal">
				<DialogHeader>
					<DialogTitle>Delete Category ({category.name})</DialogTitle>
				</DialogHeader>
				Do you want to delete the Category?
				<DialogFooter>
					<Button
						onClick={deleteHandler}
						className="bg-red-900 flex items-center gap-1"
						disabled={isLoading}
					>
						{isLoading ? (
							<Loader
								className="animate-spin"
								size={16}
							/>
						) : null}
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default BudgetCategoryDelete;
