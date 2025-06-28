import { PageHeader } from "@/components/page-header";
import { InventoryUsageTable } from "../components";

export const ListInventoryUsagePage = () => {
    return (
        <div className="flex flex-col gap-4">
            <PageHeader title="Inventory Usage History" />
            <InventoryUsageTable />
        </div>
    );
};
