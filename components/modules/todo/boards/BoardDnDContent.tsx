'use client';

import DnDContextLayout from '@/components/layout/DnDContextLayout';
import { CardType, ListType } from '@/lib/helper/todo';
import { useUpdateCardsOrderMutation } from '@/store/features/todo/card/api';
import { useUpdateListsOrderMutation } from '@/store/features/todo/list/api';
import { DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { useState } from 'react';
import BoardList from '../list/BoardList';
import BoardListForm from '../list/BoardListForm';

const BoardDnDContent = ({
	boardId,
	lists: listItems,
	cards: cardItems,
}: {
	boardId: string;
	lists: ListType[];
	cards: CardType[];
}) => {
	const [lists, setLists] = useState(listItems);
	const [cards, setCards] = useState(cardItems);
	const [updateListsOrder] = useUpdateListsOrderMutation();
	const [updateCardsOrder] = useUpdateCardsOrderMutation();

	const onDragEnd = (event: DragEndEvent) => {
		try {
			const { active, over } = event;
			if (!over) return;

			const activeId = active.id;
			const overId = over.id;

			if (activeId === overId) return;

			const isActiveAColumn = active.data.current?.type === 'List';
			if (!isActiveAColumn) return;
			const activeColumnIndex = lists.findIndex(
				(list: ListType) => list.id === activeId,
			);
			const overColumnIndex = lists.findIndex(
				(list: ListType) => list.id === overId,
			);

			const updatedLists = arrayMove(
				lists,
				activeColumnIndex,
				overColumnIndex,
			).map((list: ListType, index: number) => ({
				...list,
				listOrder: index,
			}));
			const updatedListsOrder = updatedLists.map((item: ListType) => ({
				id: item.id,
				listOrder: item.listOrder,
			}));
			updateListsOrder(updatedListsOrder);
			setLists(updatedLists);
		} catch (e: any) {
			console.log('e', e);
		}
	};

	function onDragOver(event: DragOverEvent) {
		try {
			const { active, over } = event;
			if (!over) return;

			const activeId = active.id;
			const overId = over.id;

			if (activeId === overId) return;

			const isActiveATask = active.data.current?.type === 'Card';
			const isOverATask = over.data.current?.type === 'Card';

			if (!isActiveATask) return;

			if (isActiveATask && isOverATask) {
				const previousCards = [...cards];
				const activeIndex = previousCards.findIndex(
					(card: CardType) => card.id === activeId,
				);
				const overIndex = previousCards.findIndex(
					(card: CardType) => card.id === overId,
				);
				if (cards[activeIndex].listId !== cards[overIndex].listId) {
					previousCards[activeIndex].listId =
						previousCards[overIndex].listId;
					return arrayMove(previousCards, activeIndex, overIndex - 1);
				}
				const updatedCards = arrayMove(
					previousCards,
					activeIndex,
					overIndex,
				);
				const updatedCardOrderAndList: CardType[] = [];
				updatedCards.forEach((card: CardType) => {
					const existingListWiseCardItem =
						updatedCardOrderAndList.filter(
							(item) => item.listId === card.listId,
						);
					updatedCardOrderAndList.push({
						...card,
						cardOrder: existingListWiseCardItem.length,
					});
				});
				const updatedCardsOrder = updatedCardOrderAndList.map(
					(item: CardType) => ({
						id: item.id,
						listId: item.listId,
						cardOrder: item.cardOrder,
					}),
				);
				updateCardsOrder(updatedCardsOrder);
				setCards(updatedCards);
			}

			const isOverAColumn = over.data.current?.type === 'List';

			if (isActiveATask && isOverAColumn) {
				const previousCards = [...cards];
				const activeIndex = previousCards.findIndex(
					(card: CardType) => card.id === activeId,
				);
				if (previousCards[activeIndex]?.listId) {
					previousCards[activeIndex].listId = overId.toString();
				}
				const updatedCards = arrayMove(
					previousCards,
					activeIndex,
					activeIndex,
				);
				const updatedCardOrderAndList: CardType[] = [];
				updatedCards.forEach((card: CardType) => {
					const existingListWiseCardItem =
						updatedCardOrderAndList.filter(
							(item) => item.listId === card.listId,
						);
					updatedCardOrderAndList.push({
						...card,
						cardOrder: existingListWiseCardItem.length,
					});
				});
				const updatedCardsOrder = updatedCardOrderAndList.map(
					(item: CardType) => ({
						id: item.id,
						listId: item.listId,
						cardOrder: item.cardOrder,
					}),
				);
				updateCardsOrder(updatedCardsOrder);
				setCards(updatedCards);
			}
		} catch (e: any) {
			console.log('e', e);
		}
	}

	return (
		<div className="z-10 h-full w-full overflow-x-auto">
			<DnDContextLayout
				handleDragOver={onDragOver}
				handleDragEnd={onDragEnd}
			>
				<div className="flex w-max gap-2 text-light-text">
					<SortableContext items={lists}>
						{lists?.map((list: ListType) => (
							<BoardList
								key={list.id}
								list={list}
								listCards={cards.filter(
									(card: CardType) => card.listId === list.id,
								)}
								setCards={setCards}
							/>
						))}
					</SortableContext>
					<div>
						<BoardListForm boardId={boardId} setLists={setLists} />
					</div>
				</div>
			</DnDContextLayout>
		</div>
	);
};

export default BoardDnDContent;
