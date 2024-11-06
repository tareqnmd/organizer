import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { ListType } from '@/lib/helper/todo';
import { useEditListMutation } from '@/store/features/todo/list/api';
import { useEffect, useRef, useState } from 'react';

const BoardListTitle = ({ list }: { list: ListType }) => {
	const [updateTitle] = useEditListMutation();
	const [newTitle, setNewTitle] = useState(list.title);
	const debouncedUpdateTitle = useDebounce(newTitle, 500);
	const [isEditing, setIsEditing] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.target.value);
	};

	useEffect(() => {
		updateTitle({ id: list.id, data: { title: debouncedUpdateTitle } });
	}, [updateTitle, debouncedUpdateTitle, list.id]);

	return isEditing ? (
		<Input
			ref={inputRef}
			type="text"
			value={newTitle}
			onChange={titleChangeHandler}
			onBlur={() => setIsEditing(false)}
			className="text-md h-auto rounded-none border-0 border-b !bg-transparent p-0 font-bold shadow-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
		/>
	) : (
		<span
			className="text-md border-b border-b-[#00000000] font-bold"
			onClick={() => {
				setIsEditing(true);
				inputRef.current?.focus();
			}}
		>
			{list.title}
		</span>
	);
};

export default BoardListTitle;