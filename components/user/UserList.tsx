'use client';
import Table from '@/components/ui/table/Table';
import { userTableColumns } from '@/utils/helpers/user-helper';
import { useState } from 'react';
import { BsFillEyeFill } from 'react-icons/bs';
import UserStatus from './status/UserStatus';

const UserList = ({ users }: any) => {
	const [modalType, setModalType] = useState('');
	const [userId, setUserId] = useState(null);

	const typeAction = (type: string, item: any) => {
		setModalType(type);
		setUserId(item?._id);
	};
	return (
		<>
			<UserStatus
				userId={userId}
				modalType={modalType}
				setModalType={setModalType}
			/>
			<Table
				columns={userTableColumns}
				data={users}
				actions={[
					{
						type: 'status',
						icon: <BsFillEyeFill />,
						clickHandler: typeAction,
					},
				]}
			/>
		</>
	);
};

export default UserList;
