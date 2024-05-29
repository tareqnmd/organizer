'use client';
import CustomFormInput from '@/components/common/input/CustomFormInput';
import ErrorMessage from '@/components/common/message/ErrorMessage';
import SuccessMessage from '@/components/common/message/SuccessMessage';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { categoryFormItems } from '@/lib/form-items/modules/budget';
import { getError } from '@/lib/helper/common';
import {
	useCreateBudgetCategoryMutation,
	useEditBudgetCategoryMutation,
} from '@/store/features/budget/category/api';
import { BudgetCategoryType } from '@/types/modules/budget/budget-category-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
const FormSchema = z.object({
	name: z.string().min(3, {
		message: 'Name must be at least 3 characters.',
	}),
	typeId: z.string().min(3, {
		message: 'Type is Required!',
	}),
});
const BudgetCategoryForm = ({
	category,
	setOpen,
}: {
	category?: BudgetCategoryType;
	setOpen: (arg: boolean) => void;
}) => {
	const router = useRouter();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			typeId: '',
		},
	});
	const [
		edit,
		{
			isLoading: isEditLoading,
			isError: isEditError,
			isSuccess: isEditSuccess,
			error: editError,
		},
	] = useEditBudgetCategoryMutation();
	const [
		create,
		{
			isLoading: isCreateLoading,
			isError: isCreateError,
			isSuccess: isCreateSuccess,
			error: createError,
		},
	] = useCreateBudgetCategoryMutation();
	const onSubmit = async (values: any) => {
		category?.id
			? await edit({ data: values, id: category.id })
			: await create(values);
	};

	useEffect(() => {
		if (category?.name && category.typeId) {
			form.setValue('name', category.name);
			form.setValue('typeId', category.typeId);
		}
	}, [form, category]);

	useEffect(() => {
		if (isEditError || isCreateError || isEditSuccess || isCreateSuccess) {
			toast(
				isEditError || isCreateError ? (
					<ErrorMessage
						message={getError(category?.id ? editError : createError)}
					/>
				) : (
					<SuccessMessage
						message={`Category successfully ${
							category?.id ? 'updated' : 'created'
						}`}
					/>
				)
			);
			router.refresh();
			setOpen(false);
		}
	}, [
		category?.id,
		createError,
		editError,
		isCreateError,
		isCreateSuccess,
		isEditError,
		isEditSuccess,
		router,
		setOpen,
	]);
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full grid gap-3"
			>
				{categoryFormItems.map((input) => (
					<CustomFormInput
						key={input.name}
						input={input}
						control={form?.control}
					/>
				))}
				<DialogFooter>
					<Button
						disabled={isCreateLoading || isEditLoading}
						className="flex items-center gap-1"
						type="submit"
					>
						{isCreateLoading || isEditLoading ? (
							<Loader
								className="animate-spin"
								size={16}
							/>
						) : null}
						{category?.id ? 'Update' : 'Create'}
					</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};

export default BudgetCategoryForm;
