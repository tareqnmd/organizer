'use client';
import CustomFormInput from '@/components/common/input/CustomFormInput';
import ErrorMessage from '@/components/common/message/ErrorMessage';
import { Form } from '@/components/ui/form';
import { noteFormItems } from '@/lib/form-items/modules/note';
import { getError } from '@/lib/helper/common';
import { useEditNoteMutation } from '@/store/features/note/api';
import { NoteType } from '@/types/modules/note/budget-note-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

type NoteInput = {
	subject: string;
	details: string;
};

const FormSchema = z.object({
	subject: z.string().min(3, {
		message: 'Subject must be at least 3 characters.',
	}),
	details: z.string(),
});

const NoteForm = ({ note }: { note: NoteType }) => {
	const router = useRouter();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		mode: 'onChange',
		defaultValues: {
			subject: 'Untitled',
			details: '',
		},
	});
	const {
		handleSubmit,
		setValue,
		watch,
		formState: { isValid },
	} = form;

	const [
		editNote,
		{
			isLoading: isEditLoading,
			isError: isEditError,
			isSuccess: isEditSuccess,
			error: editError,
		},
	] = useEditNoteMutation();

	const onSubmit = async (values: NoteInput) => {
		await editNote({ data: values, id: note?.id });
	};

	useEffect(() => {
		if (isEditError || (isEditSuccess && !isEditLoading)) {
			toast(isEditError && <ErrorMessage message={getError(editError)} />);
			isEditSuccess && !isEditLoading && router.refresh();
		}
	}, [note?.id, editError, isEditError, isEditSuccess, router, isEditLoading]);

	useEffect(() => {
		if (note?.id) {
			setValue('subject', note.subject);
			setValue('details', note.details);
		}
	}, [setValue, note]);

	useEffect(() => {
		let timer: any;
		const subscription = watch(() => {
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				handleSubmit(onSubmit)();
			}, 1000);
		});
		return () => subscription.unsubscribe();
	}, [handleSubmit, watch]);

	return (
		<Form {...form}>
			<div className="w-full min-w-[300px] grid gap-3">
				{noteFormItems.map((input) => (
					<CustomFormInput
						key={input.name}
						input={input}
						control={form?.control}
					/>
				))}
			</div>
		</Form>
	);
};

export default NoteForm;
