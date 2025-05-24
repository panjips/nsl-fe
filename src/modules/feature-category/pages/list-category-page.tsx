import { CategoryTable } from "../components/category-table";

export const ListCategoryPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Category Product</h1>
      <CategoryTable />
    </div>
  );
};
