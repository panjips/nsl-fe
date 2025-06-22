import { Card } from "@/components/ui/card";
import { useRevenueReport } from "../../hooks/use-revenue-report";
import { InventoryReportFilters } from "../inventory-usage/inventory-report-filters";
import { InventoryReportHeader } from "../inventory-usage/inventory-report-header";
import { RevenueTable } from "./revenue-table";

export function RevenueSummary() {
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
        revenueData,

        // Actions
        generateReport,
        exportExcel,
        exportPDF,
    } = useRevenueReport();

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
                title="Revenue Report"
                dateRange={dateRange}
                onExportExcel={exportExcel}
                onExportPDF={exportPDF}
            />

            <div className="space-y-6">
                <Card>
                    <RevenueTable data={revenueData} isLoading={isLoading} />
                </Card>
            </div>
        </div>
    );
}
