'use client';
import Modal from '@/components/modal/Modal';
import Button from '@/components/shared/button/Button';
import FormInput from '@/components/shared/input/FormItem';
import {
	useAddTransactionMutation,
	useEditTransactionMutation,
	useGetTransactionQuery,
} from '@/features/transactions/transactions-api';
import { getUserState } from '@/features/user/user-slice';
import { getError } from '@/utils/helpers';
import {
	dateInputFormat,
	transactionFormInputs,
} from '@/utils/helpers/transaction-helper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const schema = yup
	.object({
		typeId: yup.string().required(),
		amount: yup.number().typeError('amount is required'),
		date: yup.date().typeError('date is required'),
		description: yup.string().required(),
	})
	.required();

const TransactionForm = ({ setModalType, modalType, transactionId }: any) => {
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});
	const { userId } = useSelector(getUserState);
	const { data: transaction } = useGetTransactionQuery(transactionId, {
		skip: !transactionId,
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

	const transactionMutation = (data: any) => {
		transactionId
			? editTransaction({ id: transactionId, data: { ...data, userId } })
			: addTransaction({ ...data, userId });
	};

	const getColumnWidth = (name: string) => {
		if (['description', 'typeId'].includes(name)) {
			return 'col-span-2';
		}
		return 'col-span-2 md:col-span-1';
	};

	const closeModal = () => {
		setModalType('');
		reset();
	};

	useEffect(() => {
		if (transaction?._id) {
			setValue('date', dateInputFormat(transaction.date));
			setValue('amount', transaction.amount);
			setValue('typeId', transaction.typeId);
			setValue('description', transaction.description);
		}
	}, [setValue, transaction]);

	useEffect(() => {
		if (addIsSuccess) {
			toast.success('Successfully Added', {
				position: 'top-center',
				autoClose: 1000,
				hideProgressBar: true,
			});
			setModalType('');
		}
		if (addIsError) {
			toast.error(getError(addError), { position: 'top-center' });
		}
	}, [addIsSuccess, addIsError, addError, setModalType]);

	useEffect(() => {
		if (editIsSuccess) {
			toast.success('Successfully Updated', {
				position: 'top-center',
				autoClose: 1000,
				hideProgressBar: true,
			});
			setModalType('');
		}
		if (editIsError) {
			toast.error(getError(editError), { position: 'top-center' });
		}
	}, [editIsSuccess, editIsError, editError, setModalType]);

	return (
		<Modal
			title={`${transactionId ? 'Update' : 'Create'} Transaction`}
			open={modalType === 'form'}
			onCancel={closeModal}
		>
			<form
				className="p-3 bg-[#0b2447] rounded-md shadow-md"
				onSubmit={handleSubmit(transactionMutation)}
			>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					{transactionFormInputs?.map((input) => (
						<FormInput
							key={input?.name}
							input={input}
							register={register}
							errors={errors}
							extraClass={`${getColumnWidth(
								input.name
							)} input-label-white`}
						/>
					))}
				</div>
				<div className="flex justify-end mt-4">
					<Button
						type="submit"
						name={`${
							transactionId ? 'Update' : 'Create'
						} Transaction`}
						loading={addIsLoading || editIsLoading}
						mutation={true}
						extraClassNames={`!bg-white !text-black font-semibold`}
					/>
				</div>
			</form>
		</Modal>
	);
};

export default TransactionForm;
