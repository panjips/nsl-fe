import { ProductRecipeTable } from "../components";

export const ListProductRecipePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Recipe Product</h1>
      <ProductRecipeTable />
    </div>
  );
};
