import {
	Pagination as Page,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

const Pagination = ({
	currentPage,
	pages,
	changePaginate,
	changePerPage,
	perPage,
	total,
}: {
	currentPage: number;
	perPage: number;
	pages: number[];
	changePaginate: (agr: string | number) => void;
	changePerPage: (agr: number) => void;
	total: number;
}) => {
	return (
		<Page className="justify-end gap-4 sm:gap-2 items-center flex-wrap sm:flex-nowrap">
			<div className="per-page-show flex gap-2 items-center text-sm">
				Showing
				<span className="font-semibold">
					{currentPage * perPage - (perPage - 1)}
				</span>
				to
				<span className="font-semibold">
					{currentPage * perPage -
						(currentPage === pages.length
							? (currentPage * perPage) % total
							: 0)}
				</span>
			</div>
			<div className="divider w-[1px] h-3 bg-black"></div>
			<div className="per-page-change flex gap-2 items-center text-sm">
				<span className="text-sm">Per Page</span>
				<input
					type="number"
					defaultValue={perPage}
					onChange={(e: any) => changePerPage(e.target.value)}
					min={10}
					className="inp-wpn text-center w-8 rounded border-2 border-black p-1"
				/>
			</div>
			<div className="hidden sm:block divider w-[1px] h-3 bg-black"></div>
			<PaginationContent className="justify-end">
				<PaginationItem>
					<PaginationPrevious
						className={cn(
							'cursor-pointe pl-0',
							currentPage <= 1 && 'pointer-events-none opacity-50'
						)}
						onClick={() => changePaginate('prev')}
					/>
				</PaginationItem>
				{pages?.map((paginate, index) => (
					<PaginationItem key={index}>
						<PaginationLink
							className="cursor-pointer"
							onClick={() => changePaginate(paginate)}
							isActive={currentPage === paginate}
						>
							{paginate}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem>
					<PaginationNext
						className={cn(
							'cursor-pointer pr-0',
							currentPage >= pages?.length && 'pointer-events-none opacity-50'
						)}
						onClick={() => changePaginate('next')}
					/>
				</PaginationItem>
			</PaginationContent>
		</Page>
	);
};

export default Pagination;
