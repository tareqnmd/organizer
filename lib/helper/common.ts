export const getError = (error: any, defaultMessage = 'Error Found') => {
	return error?.data?.message ?? defaultMessage;
};
export const toQueryString = (obj: any) => {
	const filteredObj = Object.fromEntries(
		Object.entries(obj).filter(([_, value]) => value !== '')
	);
	const encodedKeyValuePairs = Object.entries(filteredObj).map(
		([key, value]: any) => {
			return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
		}
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

export const getYearsInRange = (start: string, end: string) => {
	const startDate = new Date(start);
	const endDate = new Date(end);
	if (startDate > endDate) {
		throw new Error('Start date cannot be after end date');
	}
	const years = [];
	let currentYear = startDate.getFullYear();
	while (currentYear <= endDate.getFullYear()) {
		years.push(currentYear);
		currentYear++;
	}
	return years;
};
