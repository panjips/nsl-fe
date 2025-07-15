import { InventoryOpnameTable } from "../components";

export const ListInventoryOpnamesPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Inventory Opnames</h1>
            <InventoryOpnameTable />
        </div>
    );
};
