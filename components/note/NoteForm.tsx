'use client';
import Button from '@/components/ui/button/Button';
import FormInput from '@/components/ui/input/FormItem';
import Loading from '@/components/ui/loader/Loading';
import {
	useAddTransactionMutation,
	useEditTransactionMutation,
	useGetTransactionQuery,
} from '@/features/hisab/transactions/api';
import { getUserState } from '@/features/user/slice';
import { getError } from '@/utils/helpers';
import { noteFormInputs } from '@/utils/helpers/note';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const schema = yup
	.object({
		name: yup.string().required(),
		details: yup.string().required(),
	})
	.required();

const NoteForm = ({ noteId }: any) => {
	const {
		register,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
		reset,
	} = useForm<any>({
		resolver: yupResolver(schema),
	});
	const { userId } = useSelector(getUserState);
	const { data: transaction, isFetching } = useGetTransactionQuery(noteId, {
		skip: !noteId,
	});
	const [
		addTransaction,
		{
			isLoading: addIsLoading,
			isSuccess: addIsSuccess,
			isError: addIsError,
			error: addError,
		},
	] = useAddTransactionMutation();
	const [
		editTransaction,
		{
			isLoading: editIsLoading,
			isSuccess: editIsSuccess,
			isError: editIsError,
			error: editError,
		},
	] = useEditTransactionMutation();

	watch('date', (value: Date) => {
		return dayjs(value).format('YYYY-MM-DD');
	});

	const transactionMutation = (data: any) => {
		noteId
			? editTransaction({
					id: noteId,
					data: {
						...data,
						date: dayjs(data.date).format('YYYY-MM-DD'),
						userId,
					},
			  })
			: addTransaction({
					...data,
					date: dayjs(data.date).format('YYYY-MM-DD'),
					userId,
			  });
	};

	useEffect(() => {
		if (transaction?._id) {
			setValue('name', transaction.name);
			setValue('details', transaction.details);
		}
	}, [setValue, transaction]);

	useEffect(() => {
		if (addIsSuccess) {
			toast.success('Successfully Added', {
				position: 'top-center',
				autoClose: 1000,
				hideProgressBar: true,
			});
			reset();
		}
		if (addIsError) {
			toast.error(getError(addError), { position: 'top-center' });
		}
	}, [addIsSuccess, addIsError, addError, reset]);

	useEffect(() => {
		if (editIsSuccess) {
			toast.success('Successfully Updated', {
				position: 'top-center',
				autoClose: 1000,
				hideProgressBar: true,
			});
			reset();
		}
		if (editIsError) {
			toast.error(getError(editError), { position: 'top-center' });
		}
	}, [editIsSuccess, editIsError, editError, reset]);

	return (
		<Loading loading={isFetching}>
			<form
				className="p-3 bg-[#0b2447] rounded-md shadow-md"
				onSubmit={handleSubmit(transactionMutation)}
			>
				<div className="grid gap-6">
					{noteFormInputs?.map((input) => (
						<FormInput
							key={input?.name}
							input={input}
							register={register}
							errors={errors}
							extraClass={`input-label-white`}
						/>
					))}
				</div>
				<div className="flex justify-end mt-4">
					<Button
						type="submit"
						name={`${noteId ? 'Update' : 'Create'} Note`}
						loading={addIsLoading || editIsLoading}
						mutation={true}
						extraClassNames={`!bg-white !text-black font-semibold`}
					/>
				</div>
			</form>
		</Loading>
	);
};

export default NoteForm;
