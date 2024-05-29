import { serverAuthFetch } from '@/lib/helper/fetch';
import NoteForm from './NoteForm';

export const getNoteDetails = async (id: string) => {
	try {
		const res = await serverAuthFetch(`note/${id}`, {
			next: { revalidate: 0 },
		});
		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}
		return res.json();
	} catch (error) {
		console.log('error', error);
	}
};

const NoteDetails = async ({ id }: { id: string }) => {
	const note = await getNoteDetails(id);
	return <NoteForm note={note} />;
};

export default NoteDetails;
