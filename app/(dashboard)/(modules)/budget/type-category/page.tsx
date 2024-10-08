import BudgetCategories from '@/components/modules/budget/category/BudgetCategories';
import { BudgetCategoryParamType } from '@/types/modules/budget/budget-category-types';

const Page = ({ searchParams }: { searchParams: BudgetCategoryParamType }) => {
	return <BudgetCategories searchParams={searchParams} />;
};

export default Page;
