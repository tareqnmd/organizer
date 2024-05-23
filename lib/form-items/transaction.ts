export const transactionFormItems = [
	{
		name: 'categoryId',
		label: 'Category',
		type: 'select',
		placeholder: 'Select a Category',
		optionUrl: '/budget/type-category-select',
		description: '',
		required: true,
	},
	{
		name: 'amount',
		label: 'Amount',
		type: 'number',
		placeholder: 'Amount',
		description: '',
		required: true,
	},
	{
		name: 'date',
		label: 'Date',
		type: 'date',
		placeholder: 'Date',
		description: '',
		required: true,
	},
	{
		name: 'description',
		label: 'Description',
		type: 'textarea',
		placeholder: 'Description',
		description: '',
		required: true,
	},
];