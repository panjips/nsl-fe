import { InventoryUsageSummary } from "../components/inventory-usage";

export default function InventoryUsageReportPage() {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold pb-4">Inventory Usage Report</h1>
            <InventoryUsageSummary />
        </div>
    );
}
