import { InventoryTable } from "../components/inventory-table";

export const ListInventoryPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Inventory Management</h1>
            <InventoryTable />
        </div>
    );
};
