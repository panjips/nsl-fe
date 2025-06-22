import { Card } from "@/components/ui/card";
import { useInventoryPurchaseReport } from "../../hooks/use-inventory-purchase-report";
import { InventoryReportFilters } from "../inventory-usage/inventory-report-filters";
import { InventoryReportHeader } from "../inventory-usage/inventory-report-header";
import { InventoryPurchaseTable } from "./inventory-purchase-table";

export function InventoryPurchaseSummary() {
    const {
        // States
        reportType,
        setReportType,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        isLoading,
        dateRange,
        inventoryPurchaseData,

        // Actions
        generateReport,
        exportExcel,
        exportPDF,
    } = useInventoryPurchaseReport();

    return (
        <div className="space-y-6 print:p-6">
            <div className="print:hidden">
                <InventoryReportFilters
                    reportType={reportType}
                    setReportType={setReportType}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    onGenerateReport={generateReport}
                />
            </div>

            <InventoryReportHeader
                title="Inventory Purchase Report"
                dateRange={dateRange}
                onExportExcel={exportExcel}
                onExportPDF={exportPDF}
            />

            <div className="space-y-6">
                <Card>
                    <InventoryPurchaseTable data={inventoryPurchaseData} isLoading={isLoading} />
                </Card>
            </div>
        </div>
    );
}
