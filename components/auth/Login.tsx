'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { loginFormItems } from '@/lib/helper/auth';
import { getError } from '@/lib/utils';
import { LogIn } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import CustomFormInput from '../common/input/CustomFormInput';

const FormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6, {
		message: 'Password must be at least 6 characters.',
	}),
});

const Login = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		try {
			setLoading(true);
			const res = await signIn('login', { ...data, redirect: false });
			console.log(res?.ok);
			if (res?.ok) {
				toast.success('Login Successful');
				router.refresh();
			} else {
				toast.error(getError(res?.error));
			}
		} catch (error) {
			toast.error(getError(error));
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid w-full gap-3"
			>
				{loginFormItems.map((input) => (
					<CustomFormInput
						key={input.name}
						input={input}
						control={form?.control}
					/>
				))}
				<Button
					className="mt-2 flex w-full gap-2"
					type="submit"
					disabled={loading}
				>
					<LogIn /> Login
				</Button>
			</form>
		</Form>
	);
};

export default Login;
