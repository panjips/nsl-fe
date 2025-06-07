import { AddonRecipeTable } from "../components/addon-recipe-table";

export const ListAddonRecipePage = () => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Recipe Add-ons</h1>
            <AddonRecipeTable />
        </div>
    );
};
