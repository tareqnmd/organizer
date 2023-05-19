export type userValue = { user: { username: string; userId: string } };

export type GridColumnsProp = {
	title: string;
	dataIndex: string;
	type: string;
}[];

export type GridColumnProp = {
	title: string;
	dataIndex: string;
	type: string;
};

export type GridDataType = any[];

export type GridPropType = {
	data: any[];
	columns: GridColumnsProp;
};

export type TypePropType = {
	_id: string;
	name: string;
};