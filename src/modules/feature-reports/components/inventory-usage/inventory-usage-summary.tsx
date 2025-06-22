import { Card } from "@/components/ui/card";
import { useInventoryUsageReport } from "../../hooks/use-inventory-usage-report";
import { InventoryReportFilters } from "./inventory-report-filters";
import { InventoryReportHeader } from "./inventory-report-header";
import { InventoryUsageTable } from "./inventory-usage-table";

export function InventoryUsageSummary() {
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
        inventoryUsageData,

        // Actions
        generateReport,
        exportExcel,
        exportPDF,
    } = useInventoryUsageReport();

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
                title="Inventory Usage Report"
                dateRange={dateRange}
                onExportExcel={exportExcel}
                onExportPDF={exportPDF}
            />

            <div className="space-y-6">
                <Card>
                    <InventoryUsageTable data={inventoryUsageData} isLoading={isLoading} />
                </Card>
            </div>
        </div>
    );
}
