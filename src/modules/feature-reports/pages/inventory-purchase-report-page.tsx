import { InventoryPurchaseSummary } from "../components/inventory-purchase/inventory-purchase-summary";

export default function InventoryPurchaseReportPage() {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold pb-4">Inventory Purchase Report</h1>
            <InventoryPurchaseSummary />
        </div>
    );
}
