'use client';
import Button from '@/components/shared/button/Button';
import Input from '@/components/shared/input/Input';
import { useLoginMutation } from '@/features/user/user-api';
import { getError } from '@/utils/helpers';
import { loginFormInputs } from '@/utils/helpers/login-helper';
import { getEventProps } from '@/utils/types/input-types';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const LoginForm = () => {
	const router = useRouter();
	const [inputsValue, setInputsValue] = useState({});
	const [login, { isSuccess, isError, error }] = useLoginMutation();

	const getEvent: getEventProps = (name, value) => {
		setInputsValue((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const loginMutation = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		login(inputsValue);
	};

	useEffect(() => {
		if (isSuccess) {
			router.push('/');
			toast.success('Successfully logged in', {
				position: 'top-center',
				autoClose: 1000,
				hideProgressBar: true,
			});
		}
		if (isError) {
			toast.error(getError(error), { position: 'top-center' });
		}
	}, [isSuccess, router, isError, error]);

	return (
		<form onSubmit={loginMutation}>
			{loginFormInputs?.map((input) => (
				<Input
					key={input.name}
					getEvent={getEvent}
					{...input}
				/>
			))}
			<div className="flex justify-end mt-6">
				<Button
					type="submit"
					name="Login"
				/>
			</div>
		</form>
	);
};

export default LoginForm;