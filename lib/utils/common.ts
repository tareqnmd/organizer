import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { clearCookie } from './server';

export const logoutHandler = async () => {
	try {
		await clearCookie();
		await signOut({
			callbackUrl: `${window.location.origin}/login`,
		});
	} catch (error) {
		await clearCookie();
		redirect('/login');
	}
};

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getError = (error: any, defaultMessage = 'Error Found') => {
	return error?.data?.message ?? defaultMessage;
};
export const toQueryString = (
	obj: Record<string, string | number | boolean | null | undefined>,
) => {
	const filteredObj = Object.fromEntries(
		Object.entries(obj).filter(
			([_, value]) =>
				value !== '' && value !== null && value !== undefined,
		),
	);
	const encodedKeyValuePairs = Object.entries(filteredObj).map(
		([key, value]) => {
			return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
		},
	);
	return `?${encodedKeyValuePairs.join('&')}`;
};
export const moneyFormat = (amount: number, currency = 'USD', type = 'en-US') =>
	new Intl.NumberFormat(type, {
		style: 'currency',
		currency,
	}).format(amount);

export const getPageNumbers = (totalTransactions: number, perPage: number) => {
	const totalPages = Math.ceil(totalTransactions / perPage);
	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
	return pageNumbers;
};

export const Currencies = [
	{ value: 'BDT', label: '৳ Taka', locale: 'en-US' },
	{ value: 'USD', label: '$ Dollar', locale: 'en-US' },
];

export function GetFormatterForCurrency(currency: string) {
	const locale = Currencies.find((c) => c.value === currency)?.locale;
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
	});
}
